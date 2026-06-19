const { Pool } = require('pg');

let pool;
function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 1,
    });
  }
  return pool;
}

function getBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch { resolve({}); }
    });
  });
}

function parseResponsables(raw) {
  if (Array.isArray(raw)) return raw;
  try { return JSON.parse(raw || '[]'); } catch { return []; }
}

function parseTask(row) {
  return { ...row, responsables: parseResponsables(row.responsables), top: !!row.top, flag: !!row.flag };
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const db = getPool();

  try {
    if (req.method === 'GET') {
      const { rows } = await db.query('SELECT * FROM tasks ORDER BY id ASC');
      res.status(200).json(rows.map(parseTask));

    } else if (req.method === 'POST') {
      const b = await getBody(req);
      const responsables = Array.isArray(b.responsables) && b.responsables.length ? b.responsables : (b.responsable ? [b.responsable] : ['Gaby']);
      const { rows } = await db.query(
        `INSERT INTO tasks (titulo,area,responsable,prioridad,estado,fecha,tipo,notas,top,flag,responsables)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
        [b.titulo, b.area||'', responsables[0], b.prioridad||'Media',
         b.estado||'Pendiente', b.fecha||'', b.tipo||'Tarea general',
         b.notas||'', !!b.top, !!b.flag, JSON.stringify(responsables)]
      );
      res.status(201).json(parseTask(rows[0]));

    } else if (req.method === 'PUT') {
      const id = parseInt(req.query.id);
      const b = await getBody(req);
      const responsables = Array.isArray(b.responsables) && b.responsables.length ? b.responsables : (b.responsable ? [b.responsable] : []);
      const { rows } = await db.query(
        `UPDATE tasks SET titulo=$1,area=$2,responsable=$3,prioridad=$4,
         estado=$5,fecha=$6,tipo=$7,notas=$8,top=$9,flag=$10,responsables=$11
         WHERE id=$12 RETURNING *`,
        [b.titulo, b.area||'', responsables[0]||'', b.prioridad||'Media',
         b.estado||'Pendiente', b.fecha||'', b.tipo||'Tarea general',
         b.notas||'', !!b.top, !!b.flag, JSON.stringify(responsables), id]
      );
      res.status(200).json(rows[0] ? parseTask(rows[0]) : { id });

    } else if (req.method === 'DELETE') {
      const id = parseInt(req.query.id);
      await db.query('DELETE FROM tasks WHERE id=$1', [id]);
      res.status(200).json({ ok: true });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

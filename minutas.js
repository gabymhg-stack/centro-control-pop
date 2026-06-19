const { Pool } = require('pg');
let pool;
function getPool() {
  if (!pool) pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 1 });
  return pool;
}
 
function getBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => { try { resolve(data ? JSON.parse(data) : {}); } catch { resolve({}); } });
  });
}
 
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
 
  const db = getPool();
  try {
    if (req.method === 'GET') {
      const { rows } = await db.query('SELECT * FROM minutas ORDER BY fecha DESC, created_at DESC');
      res.status(200).json(rows);
 
    } else if (req.method === 'POST') {
      const b = await getBody(req);
      if (!b.fecha || !b.contenido) { res.status(400).json({ error: 'fecha y contenido requeridos' }); return; }
      const { rows } = await db.query(
        'INSERT INTO minutas (fecha, contenido) VALUES ($1, $2) RETURNING *',
        [b.fecha, b.contenido]
      );
      res.status(201).json(rows[0]);
 
    } else if (req.method === 'DELETE') {
      const id = parseInt(req.query.id);
      if (!id) { res.status(400).json({ error: 'id requerido' }); return; }
      await db.query('DELETE FROM minutas WHERE id=$1', [id]);
      res.status(200).json({ ok: true });
 
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error('Minutas error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

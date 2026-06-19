const { Pool } = require('pg');
let pool;
function getPool() {
  if (!pool) pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 1 });
  return pool;
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
      const chunks = []; req.on('data', c => chunks.push(c)); await new Promise(r => req.on('end', r));
      const { fecha, contenido } = JSON.parse(Buffer.concat(chunks).toString() || '{}');
      const { rows } = await db.query('INSERT INTO minutas (fecha,contenido) VALUES ($1,$2) RETURNING *', [fecha, contenido]);
      res.status(201).json(rows[0]);
    } else if (req.method === 'DELETE') {
      await db.query('DELETE FROM minutas WHERE id=$1', [parseInt(req.query.id)]);
      res.status(200).json({ ok: true });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

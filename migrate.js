const { Pool } = require('pg');
let pool;
function getPool() {
  if (!pool) pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 1 });
  return pool;
}
 
module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const db = getPool();
  try {
    // Add responsables column to tasks (idempotent)
    await db.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS responsables TEXT DEFAULT '[]'`);
 
    // Create minutas table
    await db.query(`
      CREATE TABLE IF NOT EXISTS minutas (
        id         SERIAL PRIMARY KEY,
        fecha      TEXT NOT NULL,
        contenido  TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
 
    // Backfill responsables from responsable for existing rows
    await db.query(`
      UPDATE tasks SET responsables = json_build_array(responsable)::text
      WHERE (responsables IS NULL OR responsables = '[]') AND responsable IS NOT NULL AND responsable <> ''
    `);
 
    res.status(200).json({ ok: true, message: 'Migración completada. responsables column + minutas table ready.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
 

const pool = require('../config/db');

module.exports = {
  findAll: async () => {
  const [rows] = await pool.query(`
    SELECT 
      c.*, 
      t.nombre AS territorio 
    FROM clanes c
    JOIN territorios t ON c.territorio_id = t.territorio_id
  `);
  return rows;
},
  findById: async (id) => {
  const [rows] = await pool.query(`
    SELECT c.*, t.nombre AS territorio
    FROM clanes c
    JOIN territorios t ON c.territorio_id = t.territorio_id
    WHERE c.clan_id = ?
  `, [id]);
  return rows[0];
},
  create: async (clanData) => {
    const [result] = await pool.query(
      'INSERT INTO clanes (nombre, territorio_id, descripcion) VALUES (?, ?, ?)', [clanData.nombre, clanData.territorio_id, clanData.descripcion]);
    return result.insertId;
  },
  update: async (id, clan) => {
    const { nombre, descripcion, territorio_id } = clan;
    await pool.query('UPDATE clanes SET nombre = ?, descripcion = ?, territorio_id = ? WHERE clan_id = ?', [nombre, descripcion, territorio_id, id]);
  },
  delete: async (id) => {
  const [result] = await pool.query('DELETE FROM clanes WHERE clan_id = ?', [id]);
  return result.affectedRows;
}
};

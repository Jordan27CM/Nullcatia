const pool = require('../config/db');

module.exports = {
  findAll: async () => {
    const [rows] = await pool.query(`
      SELECT * 
      FROM pergaminos
    `);
    return rows;
  },
  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM pergaminos WHERE pergamino_id = ?', [id]);
    return rows[0];
  },
  create: async (data) => {
    const { titulo, contenido, autor_gato_id } = data;
    await pool.query('INSERT INTO pergaminos (titulo, contenido, autor_gato_id) VALUES (?, ?, ?)', [titulo, contenido, autor_gato_id]);
  },
  delete: async (id) => {
    await pool.query('DELETE FROM pergaminos WHERE pergamino_id = ?', [id]);
  }
};

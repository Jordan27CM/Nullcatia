const pool = require('../config/db');

module.exports = {
  buscarTodo: async () => {
    const [rows] = await pool.query(`
      SELECT * 
      FROM pergaminos
    `);
    return rows;
  },
  buscarId: async (id) => {
    const [rows] = await pool.query('SELECT * FROM pergaminos WHERE pergamino_id = ?', [id]);
    return rows[0];
  },
  crear: async (data) => {
    const { titulo, contenido } = data;
    await pool.query('INSERT INTO pergaminos (titulo, contenido) VALUES (?, ?)', [titulo, contenido]);
  },
  eliminar: async (id) => {
    await pool.query('DELETE FROM pergaminos WHERE pergamino_id = ?', [id]);
  }
};

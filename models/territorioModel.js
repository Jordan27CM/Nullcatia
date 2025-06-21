const pool = require('../config/db');

module.exports = {
  buscarTodo: async () => {
    const [rows] = await pool.query('SELECT * FROM territorios');
    return rows;
  },
  crear: async ({ nombre, descripcion }) => {
    await pool.query(
      'INSERT INTO territorios (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion]
    );
  }

};

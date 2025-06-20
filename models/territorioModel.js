const pool = require('../config/db');

module.exports = {
  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM territorios');
    return rows;
  },
  create: async ({ nombre, descripcion }) => {
  await pool.query(
    'INSERT INTO territorios (nombre, descripcion) VALUES (?, ?)',
    [nombre, descripcion]
  );
}

};

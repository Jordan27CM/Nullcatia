const pool = require('../config/db');

module.exports = {
  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM territorios');
    return rows;
  }
};

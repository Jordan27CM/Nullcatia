const pool = require('../config/db');

module.exports = {
  link: async (clan_id, pergamino_id) => {
    await pool.query(
      'INSERT INTO clan_pergamino (clan_id, pergamino_id) VALUES (?, ?)',
      [clan_id, pergamino_id]
    );
  },
  unlink: async (id) => {
    await pool.query('DELETE FROM clan_pergamino WHERE id = ?', [id]);
  },
  buscarTodo: async () => {
    const [rows] = await pool.query(`
    SELECT cp.id, cp.agregado_en, c.nombre AS clan, p.titulo AS pergamino
    FROM clan_pergamino cp
    JOIN clanes c ON cp.clan_id = c.clan_id
    JOIN pergaminos p ON cp.pergamino_id = p.pergamino_id
    ORDER BY c.nombre, p.titulo
  `);
    return rows;
  }, 
  buscarPergaminoPorClan: async (clan_id) => {
    const [rows] = await pool.query(`
    SELECT p.titulo
    FROM clan_pergamino cp
    JOIN pergaminos p ON cp.pergamino_id = p.pergamino_id
    WHERE cp.clan_id = ?
  `, [clan_id]);
    return rows;
  }

};

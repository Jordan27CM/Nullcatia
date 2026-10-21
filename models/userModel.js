const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class UserModel {
  static async initTable() {
    try {
      const sql = `
        CREATE TABLE IF NOT EXISTS usuarios (
          usuario_id INT AUTO_INCREMENT PRIMARY KEY,
          nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          rol ENUM('admin', 'usuario') NOT NULL DEFAULT 'usuario',
          creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await pool.query(sql);

      // Seed default accounts if empty
      const [rows] = await pool.query('SELECT COUNT(*) as count FROM usuarios');
      if (rows[0].count === 0) {
        const adminPass = await bcrypt.hash('admin123', 10);
        const userPass = await bcrypt.hash('user123', 10);

        await pool.query(
          `INSERT INTO usuarios (nombre_usuario, email, password, rol) VALUES 
           (?, ?, ?, ?),
           (?, ?, ?, ?)`,
          [
            'admin', 'admin@nullcatia.com', adminPass, 'admin',
            'usuario', 'user@nullcatia.com', userPass, 'usuario'
          ]
        );
        console.log('✅ Cuentas por defecto creadas en la base de datos (admin/admin123, usuario/user123)');
      }
    } catch (err) {
      console.error('Error inicializando tabla usuarios:', err.message);
    }
  }

  static async buscarPorNombre(nombre_usuario) {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE nombre_usuario = ?',
      [nombre_usuario]
    );
    return rows[0];
  }

  static async buscarPorEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async buscarPorId(id) {
    const [rows] = await pool.query(
      'SELECT usuario_id, nombre_usuario, email, rol, creado_en FROM usuarios WHERE usuario_id = ?',
      [id]
    );
    return rows[0];
  }

  static async crear({ nombre_usuario, email, password, rol = 'usuario' }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre_usuario, email, password, rol) VALUES (?, ?, ?, ?)',
      [nombre_usuario, email, hashedPassword, rol]
    );
    return result.insertId;
  }
}

// Auto inicializar tabla al cargar modelo
UserModel.initTable();

module.exports = UserModel;

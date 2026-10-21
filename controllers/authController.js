const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

module.exports = {
  verLogin: (req, res) => {
    if (req.session && req.session.user) {
      return res.redirect('/');
    }
    const error = req.query.error || null;
    const success = req.query.success || null;
    res.render('auth/login', { error, success });
  },

  login: async (req, res, next) => {
    try {
      const { nombre_usuario, password } = req.body;

      if (!nombre_usuario || !password) {
        return res.render('auth/login', {
          error: 'Por favor, ingresa el usuario y la contraseña.',
          success: null,
          nombre_usuario
        });
      }

      const user = await UserModel.buscarPorNombre(nombre_usuario);

      if (!user) {
        return res.render('auth/login', {
          error: 'Usuario o contraseña incorrectos.',
          success: null,
          nombre_usuario
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.render('auth/login', {
          error: 'Usuario o contraseña incorrectos.',
          success: null,
          nombre_usuario
        });
      }

      // Establecer sesión de usuario
      req.session.user = {
        id: user.usuario_id,
        nombre_usuario: user.nombre_usuario,
        email: user.email,
        rol: user.rol
      };

      res.redirect('/');
    } catch (err) {
      next(err);
    }
  },

  verRegistro: (req, res) => {
    if (req.session && req.session.user) {
      return res.redirect('/');
    }
    res.render('auth/registro', { error: null, formData: {} });
  },

  registro: async (req, res, next) => {
    try {
      const { nombre_usuario, email, password, confirmPassword, rol } = req.body;

      if (!nombre_usuario || !email || !password) {
        return res.render('auth/registro', {
          error: 'Todos los campos son obligatorios.',
          formData: { nombre_usuario, email }
        });
      }

      if (password !== confirmPassword) {
        return res.render('auth/registro', {
          error: 'Las contraseñas no coinciden.',
          formData: { nombre_usuario, email }
        });
      }

      // Verificar si ya existe usuario o email
      const usuarioExistente = await UserModel.buscarPorNombre(nombre_usuario);
      if (usuarioExistente) {
        return res.render('auth/registro', {
          error: 'El nombre de usuario ya está registrado.',
          formData: { nombre_usuario, email }
        });
      }

      const emailExistente = await UserModel.buscarPorEmail(email);
      if (emailExistente) {
        return res.render('auth/registro', {
          error: 'El correo electrónico ya está registrado.',
          formData: { nombre_usuario, email }
        });
      }

      // Asignar rol: 'usuario' por defecto, o 'admin' si expresamente se solicita y coincide con el select de demo
      const userRol = (rol === 'admin') ? 'admin' : 'usuario';

      const insertId = await UserModel.crear({
        nombre_usuario,
        email,
        password,
        rol: userRol
      });

      // Auto login después del registro
      req.session.user = {
        id: insertId,
        nombre_usuario,
        email,
        rol: userRol
      };

      res.redirect('/');
    } catch (err) {
      next(err);
    }
  },

  logout: (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          console.error('Error al cerrar sesión:', err);
        }
        res.redirect('/auth/login?success=' + encodeURIComponent('Sesión cerrada correctamente.'));
      });
    } else {
      res.redirect('/auth/login');
    }
  }
};

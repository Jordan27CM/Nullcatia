module.exports = {
  setUserLocals: (req, res, next) => {
    res.locals.user = req.session ? req.session.user : null;
    res.locals.isLoggedIn = !!(req.session && req.session.user);
    res.locals.isAdmin = !!(req.session && req.session.user && req.session.user.rol === 'admin');
    next();
  },

  requireAuth: (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.redirect('/auth/login?error=' + encodeURIComponent('Debes iniciar sesión para realizar esta acción.'));
    }
    next();
  },

  requireAdmin: (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.redirect('/auth/login?error=' + encodeURIComponent('Debes iniciar sesión como Administrador.'));
    }
    if (req.session.user.rol !== 'admin') {
      return res.status(403).render('error', { 
        message: 'Acceso Denegado: Se requieren permisos de Administrador para realizar esta acción.' 
      });
    }
    next();
  }
};

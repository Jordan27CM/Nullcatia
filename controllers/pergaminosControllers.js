const pergaminoModel = require('../models/pergaminoModel');

module.exports = {
  listar: async (req, res, next) => {
    try {
      const pergaminos = await pergaminoModel.buscarTodo();
      res.render('pergaminos/listar', { pergaminos });
    } catch (err) {
      next(err);
    }
  },

  verFormulario: (req, res) => {
    res.render('pergaminos/nuevo'); 
  },

  crear: async (req, res, next) => {
    try {
      await pergaminoModel.crear(req.body);
      res.redirect('/pergaminos');
    } catch (err) {
      next(err);
    }
  },

  eliminar: async (req, res, next) => {
    try {
      await pergaminoModel.eliminar(req.params.id);
      res.redirect('/pergaminos');
    } catch (err) {
      next(err);
    }
  }
};

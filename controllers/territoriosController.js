const territorioModel = require('../models/territorioModel');

module.exports = {
  listar: async (req, res, next) => {
    try {
      const territorios = await territorioModel.buscarTodo();
      res.render('territorios/listar', { territorios });
    } catch (err) {
      next(err);
    }
  },
  crear: async (req, res, next) => {
    try {
      const { nombre, descripcion } = req.body;
      await territorioModel.crear({ nombre, descripcion });
      res.redirect('/territorios');
    } catch (err) {
      next(err);
    }
  },
  verFormulario: (req, res) => {
    res.render('territorios/nuevo');
  }


};

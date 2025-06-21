const territorioModel = require('../models/territorioModel');

module.exports = {
  list: async (req, res, next) => {
    try {
      const territorios = await territorioModel.findAll();
      res.render('territorios/list', { territorios });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const { nombre, descripcion } = req.body;
      await territorioModel.create({ nombre, descripcion });
      res.redirect('/territorios');
    } catch (err) {
      next(err);
    }
  },
  showForm: (req, res) => {
    res.render('territorios/form');
  }


};

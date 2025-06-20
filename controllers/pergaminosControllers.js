const pergaminoModel = require('../models/pergaminoModel');

module.exports = {
  list: async (req, res, next) => {
    try {
      const pergaminos = await pergaminoModel.findAll();
      res.render('pergaminos/list', { pergaminos });
    } catch (err) {
      next(err);
    }
  },

  showForm: (req, res) => {
    res.render('pergaminos/form');
  },

  create: async (req, res, next) => {
    try {
      await pergaminoModel.create(req.body);
      res.redirect('/pergaminos');
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      await pergaminoModel.delete(req.params.id);
      res.redirect('/pergaminos');
    } catch (err) {
      next(err);
    }
  }
};

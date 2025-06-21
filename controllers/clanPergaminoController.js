const clanPergaminoModel = require('../models/clanPergaminoModel');
const clanModel = require('../models/clanModel');
const pergaminoModel = require('../models/pergaminoModel');

module.exports = {
  listar: async (req, res, next) => {
    try {
      const relaciones = await clanPergaminoModel.buscarTodo();
      res.render('clanPergaminos/listar', { relaciones });
    } catch (err) {
      next(err);
    }
  },

  verFormulario: async (req, res, next) => {
    try {
      const clanes = await clanModel.buscarTodo();
      const pergaminos = await pergaminoModel.buscarTodo();
      res.render('clanPergaminos/nuevo', { clanes, pergaminos });
    } catch (err) {
      next(err);
    }
  },

  link: async (req, res, next) => {
    try {
      const { clan_id, pergamino_id } = req.body;
      await clanPergaminoModel.link(clan_id, pergamino_id);
      res.redirect('/clanPergamino');
    } catch (err) {
      next(err);
    }
  },

  unlink: async (req, res, next) => {
    try {
      await clanPergaminoModel.unlink(req.params.id);
      res.redirect('/clanPergamino');
    } catch (err) {
      next(err);
    }
  },
};

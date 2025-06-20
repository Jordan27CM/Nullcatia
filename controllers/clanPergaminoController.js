const clanPergaminoModel = require('../models/clanPergaminoModel');
const clanModel = require('../models/clanModel');
const pergaminoModel = require('../models/pergaminoModel');

module.exports = {
  list: async (req, res, next) => {
    try {
      const relaciones = await clanPergaminoModel.findAll();
      res.render('clanPergaminos/list', { relaciones });
    } catch (err) {
      next(err);
    }
  },

  showForm: async (req, res, next) => {
    try {
      const clanes = await clanModel.findAll();
      const pergaminos = await pergaminoModel.findAll();
      res.render('clanPergaminos/form', { clanes, pergaminos });
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

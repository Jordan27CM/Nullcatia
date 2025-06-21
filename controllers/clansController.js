const clanModel = require('../models/clanModel');
const catModel = require('../models/catModel');
const territorioModel = require('../models/territorioModel');
const clanPergaminoModel = require('../models/clanPergaminoModel');

module.exports = {
  list: async (req, res, next) => {
    try {
      const clanes = await clanModel.findAll();
      res.render('clanes/list', { clanes });
    } catch (err) {
      next(err);
    }
  },

  showForm: async (req, res, next) => {
    try {
      const territorios = await territorioModel.findAll();
      res.render('clanes/form', { territorios });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      await clanModel.create(req.body);
      res.redirect('/clanes');
    } catch (err) {
      next(err);
    }
  },

  editForm: async (req, res, next) => {
    try {
      const clan = await clanModel.findById(req.params.id);
      const territorios = await territorioModel.findAll();
      res.render('clanes/edit', { clan, territorios });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      await clanModel.update(req.params.id, req.body);
      res.redirect('/clanes');
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      const gatosEnClan = await catModel.countByClan(req.params.id);

      if (gatosEnClan > 0) {
        return res.redirect('/clanes/error');
      } else {
        await clanModel.delete(req.params.id);
        res.redirect('/clanes');
      }
    } catch (err) {
      next(err);
    }
  },

  error: (req, res) => {
    res.render('clanes/error');
  },
  show: async (req, res, next) => {
    try {
      const { id } = req.params;
      const clan = await clanModel.findById(id);
      const gatos = await catModel.findByClan(id);
      const pergaminos = await clanPergaminoModel.findPergaminosByClan(id);

      if (!clan) {
        return res.status(404).render('error', { message: 'Clan no encontrado.' });
      }

      res.render('clanes/detail', { clan, gatos, pergaminos });
    } catch (err) {
      next(err);
    }
  }
};

const clanModel = require('../models/clanModel');
const catModel = require('../models/catModel');
const territorioModel = require('../models/territorioModel');
const clanPergaminoModel = require('../models/clanPergaminoModel');

module.exports = {
  listar: async (req, res, next) => {
    try {
      const clanes = await clanModel.buscarTodo();
      res.render('clanes/listar', { clanes });
    } catch (err) {
      next(err);
    }
  },

  verFormulario: async (req, res, next) => {
    try {
      const territorios = await territorioModel.buscarTodo();
      res.render('clanes/nuevo', { territorios });
    } catch (err) {
      next(err);
    }
  },

  crear: async (req, res, next) => {
    try {
      await clanModel.crear(req.body);
      res.redirect('/clanes');
    } catch (err) {
      next(err);
    }
  },

  formularioEditar: async (req, res, next) => {
    try {
      const clan = await clanModel.buscarId(req.params.id);
      const territorios = await territorioModel.buscarTodo();
      res.render('clanes/editar', { clan, territorios });
    } catch (err) {
      next(err);
    }
  },

  actualizar: async (req, res, next) => {
    try {
      await clanModel.actualizar(req.params.id, req.body);
      res.redirect('/clanes');
    } catch (err) {
      next(err);
    }
  },

  eliminar: async (req, res, next) => {
    try {
      const gatosEnClan = await catModel.contarPorClan(req.params.id);

      if (gatosEnClan > 0) {
        return res.redirect('/clanes/error');
      } else {
        await clanModel.eliminar(req.params.id);
        res.redirect('/clanes');
      }
    } catch (err) {
      next(err);
    }
  },

  error: (req, res) => {
    res.render('clanes/error');
  },
  ver: async (req, res, next) => {
    try {
      const { id } = req.params;
      const clan = await clanModel.buscarId(id);
      const gatos = await catModel.buscarPorClan(id);
      const pergaminos = await clanPergaminoModel.buscarPergaminoPorClan(id);

      if (!clan) {
        return res.status(404).render('error', { message: 'Clan no encontrado.' });
      }

      res.render('clanes/detalles', { clan, gatos, pergaminos });
    } catch (err) {
      next(err);
    }
  }
};

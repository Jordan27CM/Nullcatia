const territorioModel = require('../models/territorioModel');

module.exports = {
  list: async (req, res, next) => {
    try {
      const territorios = await territorioModel.findAll();
      res.render('territorios/list', { territorios });
    } catch (err) {
      next(err);
    }
  }
};

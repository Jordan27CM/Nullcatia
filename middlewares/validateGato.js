const { body, validationResult } = require('express-validator');

const validateGato = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('raza').notEmpty().withMessage('La raza es obligatoria'),
  body('fecha_nacimiento').isDate().withMessage('Fecha inválida'),
  body('clan_id').isInt().withMessage('Clan requerido'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('gatos/form', {
        clanes: [], // o trae los clanes otra vez
        errors: errors.array(),
        gato: req.body
      });
    }
    next();
  }
];

module.exports = validateGato;

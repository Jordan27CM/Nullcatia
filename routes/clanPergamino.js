const express = require('express');
const router = express.Router();
const clanPergaminoController = require('../controllers/clanPergaminoController');

router.get('/', clanPergaminoController.listar);
router.get('/nuevo', clanPergaminoController.verFormulario);
router.post('/', clanPergaminoController.link);
router.delete('/:id', clanPergaminoController.unlink);

module.exports = router;

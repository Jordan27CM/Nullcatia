const express = require('express');
const router = express.Router();
const clanPergaminoController = require('../controllers/clanPergaminoController');
const { requireAdmin } = require('../middlewares/authMiddleware');

router.get('/', clanPergaminoController.listar);
router.get('/nuevo', requireAdmin, clanPergaminoController.verFormulario);
router.post('/', requireAdmin, clanPergaminoController.link);
router.delete('/:id', requireAdmin, clanPergaminoController.unlink);

module.exports = router;


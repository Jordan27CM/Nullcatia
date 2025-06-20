const express = require('express');
const router = express.Router();
const clanPergaminoController = require('../controllers/clanPergaminoController');

router.get('/', clanPergaminoController.list);
router.get('/nuevo', clanPergaminoController.showForm);
router.post('/', clanPergaminoController.link);
router.delete('/:id', clanPergaminoController.unlink);

module.exports = router;

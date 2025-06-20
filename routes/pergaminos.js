const express = require('express');
const router = express.Router();
const pergaminosController = require('../controllers/pergaminosControllers');

router.get('/', pergaminosController.list);
router.get('/nuevo', pergaminosController.showForm);
router.post('/', pergaminosController.create);
router.delete('/:id', pergaminosController.remove);

module.exports = router;

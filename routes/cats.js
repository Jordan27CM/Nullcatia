const express = require('express');
const router = express.Router();
const catsController = require('../controllers/catsController');
const validateGato = require('../middlewares/validateGato');


router.get('/', catsController.list);
router.get('/nuevo', catsController.showForm);
router.post('/', validateGato, catsController.create);
router.get('/:id/editar', catsController.editForm);
router.put('/:id', catsController.update);
router.delete('/:id', catsController.remove);

module.exports = router;

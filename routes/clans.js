const express = require('express');
const router = express.Router();
const clansController = require('../controllers/clansController');

router.get('/', clansController.list);
router.get('/nuevo', clansController.showForm);
router.post('/', clansController.create);
router.get('/:id/editar', clansController.editForm);
router.put('/:id', clansController.update);
router.delete('/:id', clansController.remove);
router.get('/error', clansController.error);



module.exports = router;

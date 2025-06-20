const express = require('express');
const router = express.Router();
const territoriosController = require('../controllers/territoriosController');

router.get('/nuevo', territoriosController.showForm);
router.get('/', territoriosController.list);
router.post('/', territoriosController.create);
module.exports = router;

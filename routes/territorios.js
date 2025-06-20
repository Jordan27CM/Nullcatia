const express = require('express');
const router = express.Router();
const territoriosController = require('../controllers/territoriosController');

router.get('/', territoriosController.list);

module.exports = router;

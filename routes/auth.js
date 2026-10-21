const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.verLogin);
router.post('/login', authController.login);

router.get('/registro', authController.verRegistro);
router.post('/registro', authController.registro);

router.get('/logout', authController.logout);
router.post('/logout', authController.logout);

module.exports = router;

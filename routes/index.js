const express = require('express');
const router = express.Router();

const catsRoutes = require('./cats');
const clansRoutes = require('./clans');
const pergaminosRoutes = require('./pergaminos');
const territoriosRoutes = require('./territorios');
const clanPergaminoRoutes = require('./clanPergamino');


router.use('/gatos', catsRoutes);
router.use('/clanes', clansRoutes);
router.use('/pergaminos', pergaminosRoutes);
router.use('/territorios', territoriosRoutes);
router.use('/clanPergamino', clanPergaminoRoutes);

module.exports = router;

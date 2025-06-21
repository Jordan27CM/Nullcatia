const express = require('express');
const router = express.Router();
const territoriosController = require('../controllers/territoriosController');

/**
 * @swagger
 * tags:
 *   name: Territorios
 *   description: Gestión de territorios del reino
 */

/**
 * @swagger
 * /territorios/nuevo:
 *   get:
 *     summary: Mostrar formulario para crear un nuevo territorio
 *     tags: [Territorios]
 *     responses:
 *       200:
 *         description: Formulario para nuevo territorio
 */
router.get('/nuevo', territoriosController.showForm);

/**
 * @swagger
 * /territorios:
 *   get:
 *     summary: Obtener la lista de todos los territorios
 *     tags: [Territorios]
 *     responses:
 *       200:
 *         description: Lista de territorios
 */
router.get('/', territoriosController.list);
/**
 * @swagger
 * /territorios:
 *   post:
 *     summary: Crear un nuevo territorio
 *     tags: [Territorios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Territorio creado correctamente
 */
router.post('/', territoriosController.create);


module.exports = router;

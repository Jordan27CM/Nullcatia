const express = require('express');
const router = express.Router();
const clansController = require('../controllers/clansController');

/**
 * @swagger
 * tags:
 *   name: Clanes
 *   description: Gestion de clanes que contiene el reino
 */
/**
 * @swagger
 * /clanes:
 *   get:
 *     summary: Obtener lista de clanes
 *     tags: [Clanes]
 *     responses:
 *       200:
 *         description: Lista de clanes
 */
router.get('/', clansController.listar);

/**
 * @swagger
 * /clanes/nuevo:
 *   get:
 *     summary: Mostrar formulario para crear un nuevo clan
 *     tags: [Clanes]
 *     responses:
 *       200:
 *         description: Formulario de creación de clan
 */
router.get('/nuevo', clansController.verFormulario);

/**
 * @swagger
 * /clanes:
 *   post:
 *     summary: Crear un nuevo clan
 *     tags: [Clanes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - territorio_id
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               territorio_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Clan creado exitosamente
 */
router.post('/', clansController.crear);

/**
 * @swagger
 * /clanes/{id}/editar:
 *   get:
 *     summary: Mostrar formulario para editar un clan
 *     tags: [Clanes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del clan a editar
 *     responses:
 *       200:
 *         description: Formulario de edición de clan
 *       404:
 *         description: Clan no encontrado
 */
router.get('/:id/editar', clansController.formularioEditar);

/**
 * @swagger
 * /clanes/{id}:
 *   put:
 *     summary: Actualizar un clan existente
 *     tags: [Clanes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del clan
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               territorio_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Clan actualizado
 *       404:
 *         description: Clan no encontrado
 */
router.put('/:id', clansController.actualizar);

/**
 * @swagger
 * /clanes/{id}:
 *   delete:
 *     summary: Eliminar un clan por ID
 *     tags: [Clanes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del clan
 *     responses:
 *       200:
 *         description: Clan eliminado
 *       404:
 *         description: Clan no encontrado
 */
router.delete('/:id', clansController.eliminar);


router.get('/:id', clansController.ver);
/**
 * @swagger
 * /clanes/{id}:
 *   get:
 *     summary: Ver los detalles de un clan
 *     tags: [Clanes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del clan
 *     responses:
 *       200:
 *         description: Detalles del clan
 *       404:
 *         description: Clan no encontrado
 */
router.get('/error', clansController.error);
router.get('/exportar/pdf', clansController.exportPDF);



module.exports = router;

const express = require('express');
const router = express.Router();
const pergaminosController = require('../controllers/pergaminosControllers');

/**
 * @swagger
 * tags:
 *   name: Pergaminos
 *   description: Gestión de pergaminos antiguos del reino
 */

/**
 * @swagger
 * /pergaminos:
 *   get:
 *     summary: Obtener la lista de pergaminos
 *     tags: [Pergaminos]
 *     responses:
 *       200:
 *         description: Lista de pergaminos disponibles
 */
router.get('/', pergaminosController.list);

/**
 * @swagger
 * /pergaminos/nuevo:
 *   get:
 *     summary: Mostrar formulario para crear un nuevo pergamino
 *     tags: [Pergaminos]
 *     responses:
 *       200:
 *         description: Formulario de nuevo pergamino
 */
router.get('/nuevo', pergaminosController.showForm);

/**
 * @swagger
 * /pergaminos:
 *   post:
 *     summary: Crear un nuevo pergamino
 *     tags: [Pergaminos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - contenido
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pergamino creado correctamente
 */
router.post('/', pergaminosController.create);

/**
 * @swagger
 * /pergaminos/{id}:
 *   delete:
 *     summary: Eliminar un pergamino por ID
 *     tags: [Pergaminos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pergamino
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pergamino eliminado
 *       404:
 *         description: Pergamino no encontrado
 */
router.delete('/:id', pergaminosController.remove);

module.exports = router;

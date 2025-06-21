const express = require('express');
const router = express.Router();
const catsController = require('../controllers/catsController');
const validateGato = require('../middlewares/validateGato');
/**
 * @swagger
 * tags:
 *   name: Gatos
 *   description: Gestion de los gatos que habitan el reino
 */
/**
 * @swagger
 * /gatos:
 *   get:
 *     summary: Obtener todos los gatos
 *     tags: [Gatos]
 *     responses:
 *       200:
 *         description: Lista de gatos
 */
router.get('/', catsController.listar);
/**
 * @swagger
 * /gatos/nuevo:
 *   get:
 *     summary: Mostrar el formulario para agregar un nuevo gato
 *     tags: [Gatos]
 *     responses:
 *       200:
 *         description: Formulario de nuevo gato
 */
router.get('/nuevo', catsController.verFormulario);
/**
 * @swagger
 * /gatos:
 *   post:
 *     summary: Crear un nuevo gato
 *     tags: [Gatos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - raza
 *               - clan_id
 *               - fecha_nacimiento
 *             properties:
 *               nombre:
 *                 type: string
 *               raza:
 *                 type: string
 *               clan_id:
 *                 type: integer
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Gato creado correctamente
 */
router.post('/', validateGato, catsController.crear);
/**
 * @swagger
 * /gatos/{id}/editar:
 *   get:
 *     summary: Mostrar formulario para editar un gato existente
 *     tags: [Gatos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del gato a editar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Formulario de edición del gato
 *       404:
 *         description: Gato no encontrado
 */
router.get('/:id/editar', catsController.formularioEditar);
/**
 * @swagger
 * /gatos/{id}:
 *   put:
 *     summary: Actualizar un gato por ID
 *     tags: [Gatos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del gato a actualizar
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               raza:
 *                 type: string
 *               clan_id:
 *                 type: integer
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Gato actualizado
 *       404:
 *         description: Gato no encontrado
 */
router.put('/:id', catsController.actualizar);
/**
 * @swagger
 * /gatos/{id}:
 *   delete:
 *     summary: Eliminar un gato por ID
 *     tags: [Gatos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del gato a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gato eliminado
 *       404:
 *         description: Gato no encontrado
 */
router.delete('/:id', catsController.eliminar);
/**
 * @swagger
 * /gatos/{id}:
 *   get:
 *     summary: Ver detalles de un gato por ID
 *     tags: [Gatos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del gato
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del gato
 *       404:
 *         description: Gato no encontrado
 */
router.get('/:id', catsController.detalles);

module.exports = router;

import express from 'express';
import { roleController } from '../controllers/index.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Gestion des rôles utilisateurs
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Récupère tous les rôles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Liste des rôles
 *   post:
 *     summary: Crée un nouveau rôle
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "admin"
 *             description: "Accès complet"
 *     responses:
 *       200:
 *         description: Rôle créé
 */
router.get('/', roleController.getRoles);
router.post('/', roleController.createRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Met à jour un rôle
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             name: "user"
 *             description: "Accès limité"
 *     responses:
 *       200:
 *         description: Rôle mis à jour
 *   delete:
 *     summary: Supprime un rôle par ID
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *     responses:
 *       200:
 *         description: Rôle supprimé
 */
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

/**
 * @swagger
 * /api/roles:
 *   delete:
 *     summary: Supprime tous les rôles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Tous les rôles ont été supprimés
 */
router.delete('/', roleController.deleteAllRoles);

export default router;

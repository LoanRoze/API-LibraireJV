import express from 'express';
import { userRoleController } from '../controllers/index.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: UserRoles
 *   description: Association entre les utilisateurs et leurs rôles
 */

/**
 * @swagger
 * /api/user-roles:
 *   get:
 *     summary: Récupère toutes les associations utilisateur-rôle
 *     tags: [UserRoles]
 *     responses:
 *       200:
 *         description: Liste des associations
 *         content:
 *           application/json:
 *             example:
 *               - userId: 1
 *                 roleId: 2
 *               - userId: 3
 *                 roleId: 1
 *   post:
 *     summary: Attribue un rôle à un utilisateur
 *     tags: [UserRoles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 1
 *             roleId: 2
 *     responses:
 *       200:
 *         description: Rôle attribué avec succès
 */
router.get('/', userRoleController.getUserRoles);
router.post('/', userRoleController.assignRoleToUser);

/**
 * @swagger
 * /api/user-roles/{id}:
 *   get:
 *     summary: Récupère une association utilisateur-rôle par ID
 *     tags: [UserRoles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Association trouvée
 *         content:
 *           application/json:
 *             example:
 *               id: 7
 *               userId: 1
 *               roleId: 2
 *   put:
 *     summary: Met à jour une association utilisateur-rôle
 *     tags: [UserRoles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 2
 *             roleId: 3
 *     responses:
 *       200:
 *         description: Association mise à jour
 *   delete:
 *     summary: Supprime une association utilisateur-rôle
 *     tags: [UserRoles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Association supprimée
 */
router.get('/:id', userRoleController.getUserRoleById);
router.put('/:id', userRoleController.updateUserRole);
router.delete('/:id', userRoleController.deleteUserRole);

/**
 * @swagger
 * /api/user-roles:
 *   delete:
 *     summary: Supprime toutes les associations utilisateur-rôle
 *     tags: [UserRoles]
 *     responses:
 *       200:
 *         description: Toutes les associations supprimées
 */
router.delete('/', userRoleController.deleteAllUserRoles);

export default router;

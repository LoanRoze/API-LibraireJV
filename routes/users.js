import express from 'express';
import { userController } from '../controllers/index.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste récupérée
 *   post:
 *     summary: Inscription d’un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: "Pierre"
 *             email: "pierre@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: Utilisateur enregistré
 */
router.get('/', userController.getUsers);
router.post('/', userController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Connexion d’un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "pierre@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: JWT renvoyé en cas de succès
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Détails utilisateur
 *   put:
 *     summary: Met à jour un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             username: "Pierre"
 *             email: "newmail@example.com"
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *     responses:
 *       200:
 *         description: Supprimé
 */
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Supprime tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Tous les utilisateurs supprimés
 */
router.delete('/', userController.deleteAllUsers);

export default router;

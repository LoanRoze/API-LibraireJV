import express from 'express';
import { userGameController } from '../controllers/index.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: UserGames
 *   description: Association entre les utilisateurs et leurs jeux
 */

/**
 * @swagger
 * /api/user-games:
 *   get:
 *     summary: Récupère la liste de toutes les associations utilisateur-jeu
 *     tags: [UserGames]
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès
 *         content:
 *           application/json:
 *             example:
 *               - userId: 1
 *                 gameId: 2
 *               - userId: 3
 *                 gameId: 4
 *   post:
 *     summary: Associe un jeu à un utilisateur
 *     tags: [UserGames]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 1
 *             gameId: 2
 *     responses:
 *       200:
 *         description: Association créée
 */
router.get('/', userGameController.getAllUserGames);
router.post('/', userGameController.createUserGame);

/**
 * @swagger
 * /api/user-games/{id}:
 *   get:
 *     summary: Récupère une association spécifique par ID
 *     tags: [UserGames]
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
 *               id: 5
 *               userId: 1
 *               gameId: 2
 *   put:
 *     summary: Met à jour une association utilisateur-jeu
 *     tags: [UserGames]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 1
 *             gameId: 3
 *     responses:
 *       200:
 *         description: Association mise à jour
 *   delete:
 *     summary: Supprime une association utilisateur-jeu
 *     tags: [UserGames]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Association supprimée
 */
router.get('/:id', userGameController.getUserGameById);
router.put('/:id', userGameController.updateUserGame);
router.delete('/:id', userGameController.deleteUserGame);

/**
 * @swagger
 * /api/user-games:
 *   delete:
 *     summary: Supprime toutes les associations utilisateur-jeu
 *     tags: [UserGames]
 *     responses:
 *       200:
 *         description: Toutes les associations supprimées
 */
router.delete('/', userGameController.deleteAllUserGames);


export default router;

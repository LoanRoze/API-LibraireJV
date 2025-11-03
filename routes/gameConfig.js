import express from 'express';
import { gameConfigController } from '../controllers/index.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Game Config
 *   description: Configuration spécifique aux jeux (MongoDB)
 */

/**
 * @swagger
 * /api/game-config/{gameId}:
 *   get:
 *     summary: Récupère la configuration d’un jeu
 *     tags: [Game Config]
 *     parameters:
 *       - name: gameId
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Configuration récupérée
 *         content:
 *           application/json:
 *             example:
 *               gameId: 1
 *               settings:
 *                 difficulty: "Normal"
 *                 sound: true
 *                 graphics: "High"
 *   post:
 *     summary: Définit la configuration d’un jeu
 *     tags: [Game Config]
 *     parameters:
 *       - name: gameId
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             settings:
 *               difficulty: "Hard"
 *               sound: false
 *               graphics: "Ultra"
 *     responses:
 *       200:
 *         description: Configuration enregistrée
 */
router.get('/:gameId', gameConfigController.getConfig);
router.post('/:gameId', gameConfigController.setConfig);

export default router;

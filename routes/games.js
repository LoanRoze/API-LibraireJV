import express from 'express';
import { gameController } from '../controllers/index.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Gestion des jeux vidéo
 */

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Récupère la liste de tous les jeux
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Liste de jeux récupérée avec succès
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 title: "The Legend of Zelda"
 *                 description: "Un jeu d'aventure emblématique"
 *                 genre: "Aventure"
 *                 releaseYear: 1986
 *                 logoUrl: "https://example.com/zelda.png"
 *   post:
 *     summary: Crée un nouveau jeu
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Super Mario Odyssey"
 *             description: "Un jeu de plateforme en 3D"
 *             genre: "Plateforme"
 *             releaseYear: 2017
 *             logoUrl: "https://example.com/mario.png"
 *     responses:
 *       200:
 *         description: Jeu créé avec succès
 */
router.get('/', gameController.getGames);
router.post('/', gameController.createGame);

/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     summary: Récupère un jeu par son ID
 *     tags: [Games]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Détails du jeu
 *   put:
 *     summary: Met à jour un jeu
 *     tags: [Games]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Zelda Remastered"
 *             description: "Version modernisée"
 *             genre: "Aventure"
 *             releaseYear: 2023
 *             logoUrl: "https://example.com/zelda-remastered.png"
 *     responses:
 *       200:
 *         description: Jeu mis à jour
 *   delete:
 *     summary: Supprime un jeu par son ID
 *     tags: [Games]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Jeu supprimé
 */
router.get('/:id', gameController.getGameById);
router.put('/:id', gameController.updateGame);
router.delete('/:id', gameController.deleteGame);

/**
 * @swagger
 * /api/games:
 *   delete:
 *     summary: Supprime tous les jeux
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Tous les jeux ont été supprimés
 */
router.delete('/', gameController.deleteAllGames);

export default router;

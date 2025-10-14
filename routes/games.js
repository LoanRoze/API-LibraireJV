import express from 'express';
import { gameController } from '../controllers/index.js';

const router = express.Router();

router.get('/', gameController.getGames);
router.get('/:id', gameController.getGameById);
router.post('/', gameController.createGame);
router.put('/:id', gameController.updateGame);
router.delete('/:id', gameController.deleteGame);
router.delete('/', gameController.deleteAllGames);

export default router;

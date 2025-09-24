import express from 'express';
import * as userGameController from '../controllers/UserGameController.js';

const router = express.Router();

router.get('/', userGameController.getAllUserGames);
router.get('/:id', userGameController.getUserGameById);
router.post('/', userGameController.createUserGame);
router.put('/:id', userGameController.updateUserGame);
router.delete('/:id', userGameController.deleteUserGame);

export default router;

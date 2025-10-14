import express from 'express';
import { userGameController } from '../controllers/index.js';

const router = express.Router();

router.get('/', userGameController.getAllUserGames);
router.get('/:id', userGameController.getUserGameById);
router.post('/', userGameController.createUserGame);
router.put('/:id', userGameController.updateUserGame);
router.delete('/:id', userGameController.deleteUserGame);
router.delete('/', userGameController.deleteAllUserGames);


export default router;

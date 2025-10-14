import express from 'express';
import { gameConfigController } from '../controllers/index.js';

const router = express.Router();

router.get('/:gameId', gameConfigController.getConfig);
router.post('/:gameId', gameConfigController.setConfig);

export default router;

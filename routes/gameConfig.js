import express from 'express';
import * as gameConfigController from '../controllers/gameConfigController.js';

const router = express.Router();

router.get('/:gameId', gameConfigController.getConfig);
router.post('/:gameId', gameConfigController.setConfig);

export default router;

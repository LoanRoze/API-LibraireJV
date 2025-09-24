import express from 'express';

import userRoutes from './users.js';
import roleRoutes from './roles.js';
import gameRoutes from './games.js';
import gameConfigRoutes from './gameConfig.js';
import userRoleRoutes from './userRole.js';
import userGameRoutes from './userGame.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/games', gameRoutes);
router.use('/game-config', gameConfigRoutes);
router.use('/user-roles', userRoleRoutes);
router.use('/user-games', userGameRoutes);

export default router;

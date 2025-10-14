import express from 'express';
import { userRoleController } from '../controllers/index.js';

const router = express.Router();

router.get('/', userRoleController.getUserRoles);
router.get('/:id', userRoleController.getUserRoleById);
router.post('/', userRoleController.assignRoleToUser);
router.put('/:id', userRoleController.updateUserRole);
router.delete('/:id', userRoleController.deleteUserRole);
router.delete('/', userRoleController.deleteAllUserRoles);

export default router;

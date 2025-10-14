import express from 'express';
import { roleController } from '../controllers/index.js';

const router = express.Router();

router.get('/', roleController.getRoles);
router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);
router.delete('/', roleController.deleteAllRoles);

export default router;

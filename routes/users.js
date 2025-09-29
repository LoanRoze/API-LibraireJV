import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.get('/', userController.getUserByEmail);
router.get('/', userController.login)
router.post('/', userController.register);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.delete('/', userController.deleteAllUsers);

export default router;

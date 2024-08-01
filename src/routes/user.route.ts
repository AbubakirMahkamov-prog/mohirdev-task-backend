import express from 'express';
import UserController from "../controllers/UserController";
import { UserModel } from '../db/models/users.model'
import { createSchema, updateSchema } from '../middlewares/validators/userSchema';
import authMiddleware from '../middlewares/authMiddleware'
import roleUtils from '../startup/role.utils';
const router = express.Router();
const userController = new UserController(UserModel as any);

router.get('/', authMiddleware(roleUtils.Admin as any), userController.getAll)
router.get('/:id', authMiddleware(), userController.getOne)
router.post('/', authMiddleware(roleUtils.Admin as any),createSchema, userController.create)
router.delete('/:id', authMiddleware(roleUtils.Admin as any), userController.deleteOne)
router.patch('/:id', authMiddleware(roleUtils.Admin as any), updateSchema, userController.update)

export default router;
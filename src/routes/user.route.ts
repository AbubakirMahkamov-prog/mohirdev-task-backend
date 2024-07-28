import express from 'express';
import UserController from "../controllers/UserController";
import { UserModel } from '../db/models/users.model'
import { createSchema } from '../middlewares/validators/userSchema';
const router = express.Router();
const userController = new UserController(UserModel as any);

router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.post('/', createSchema, userController.create)
router.delete('/:id', userController.deleteOne)
router.patch('/:id', userController.update)

export default router;
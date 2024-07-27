import express from 'express';
import UserController from "../controllers/UserController";
import { UserModel } from '../db/models/users.model'
const router = express.Router();
const userController = new UserController(UserModel as any);

router.get('/', userController.getAll)

export default router;
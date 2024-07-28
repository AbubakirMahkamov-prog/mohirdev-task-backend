import express from 'express';
import AuthController from "../controllers/AuthController";
import { UserModel } from '../db/models/users.model'
import { loginSchema } from '../middlewares/validators/authSchema';
const router = express.Router();

const authController = new AuthController(UserModel as any);

router.post('/login', loginSchema, authController.login)

export default router;
import express from 'express';
import AuthController from "../controllers/AuthController";
import { UserModel } from '../db/models/users.model'
import { loginSchema, registrationSchema } from '../middlewares/validators/authSchema';
const router = express.Router();

const authController = new AuthController(UserModel as any);

router.post('/login', loginSchema, authController.login)
router.post('/registration', registrationSchema, authController.registration)

export default router;
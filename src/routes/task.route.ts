import express from 'express';
import TaskController from "../controllers/TaskController";
import { UserModel } from '../db/models/users.model'
import { taskCreateSchema, taskUpdateSchema } from '../middlewares/validators/taskSchema';
import authMiddleware from '../middlewares/authMiddleware';
const router = express.Router();

const taskController = new TaskController(UserModel as any);

router.post('/create', authMiddleware(), taskCreateSchema, taskController.create)
router.patch('/update/:id', authMiddleware(), taskUpdateSchema, taskController.update)
router.get('/get-mine', authMiddleware(), taskController.getMine)

export default router;
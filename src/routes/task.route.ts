import express from 'express';
import TaskController from "../controllers/TaskController";
import { TaskModel } from '../db/models/task.model'
import { taskCreateSchema, taskUpdateSchema } from '../middlewares/validators/taskSchema';
import authMiddleware from '../middlewares/authMiddleware';
const router = express.Router();

const taskController = new TaskController(TaskModel as any);

router.post('/', authMiddleware(), taskCreateSchema, taskController.create)
router.patch('/:id', authMiddleware(), taskUpdateSchema, taskController.update)
router.get('/get-mine', authMiddleware(), taskController.getMine)
router.get('/:id', authMiddleware(), taskController.getOne);

export default router;
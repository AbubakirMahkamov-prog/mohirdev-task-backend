import express from 'express';
import TaskController from "../controllers/TaskController";
import { TaskModel } from '../db/models/task.model'
import { taskCreateSchema, taskUpdateSchema } from '../middlewares/validators/taskSchema';
import authMiddleware from '../middlewares/authMiddleware';
import roleUtils from '../startup/role.utils';

const router = express.Router();

const taskController = new TaskController(TaskModel as any);

router.get('/statistics', authMiddleware(roleUtils.Admin as any), taskController.getStatistic);
router.post('/', authMiddleware(), taskCreateSchema, taskController.create)
router.patch('/:id', authMiddleware(), taskUpdateSchema, taskController.update)
router.get('/get-mine-new', authMiddleware(), taskController.getMineNew)
router.get('/get-mine-completed', authMiddleware(), taskController.getMineCompleted)
router.get('/:id', authMiddleware(), taskController.getOne);
router.post('/set-new/:id', authMiddleware(), taskController.setNew);
router.post('/set-completed/:id', authMiddleware(), taskController.setCompleted);
router.get('/task-by-user/:id/:status', authMiddleware(roleUtils.Admin as any), taskController.getByUserId);

export default router;
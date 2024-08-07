"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TaskController_1 = __importDefault(require("../controllers/TaskController"));
const task_model_1 = require("../db/models/task.model");
const taskSchema_1 = require("../middlewares/validators/taskSchema");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const role_utils_1 = __importDefault(require("../startup/role.utils"));
const router = express_1.default.Router();
const taskController = new TaskController_1.default(task_model_1.TaskModel);
router.get('/statistics', (0, authMiddleware_1.default)(role_utils_1.default.Admin), taskController.getStatistic);
router.post('/', (0, authMiddleware_1.default)(), taskSchema_1.taskCreateSchema, taskController.create);
router.patch('/:id', (0, authMiddleware_1.default)(), taskSchema_1.taskUpdateSchema, taskController.update);
router.get('/get-mine-new', (0, authMiddleware_1.default)(), taskController.getMineNew);
router.get('/get-mine-completed', (0, authMiddleware_1.default)(), taskController.getMineCompleted);
router.get('/:id', (0, authMiddleware_1.default)(), taskController.getOne);
router.post('/set-new/:id', (0, authMiddleware_1.default)(), taskController.setNew);
router.post('/set-completed/:id', (0, authMiddleware_1.default)(), taskController.setCompleted);
router.get('/task-by-user/:id/:status', (0, authMiddleware_1.default)(role_utils_1.default.Admin), taskController.getByUserId);
exports.default = router;

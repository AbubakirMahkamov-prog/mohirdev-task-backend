"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const users_model_1 = require("../db/models/users.model");
const userSchema_1 = require("../middlewares/validators/userSchema");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const role_utils_1 = __importDefault(require("../startup/role.utils"));
const router = express_1.default.Router();
const userController = new UserController_1.default(users_model_1.UserModel);
router.get('/', (0, authMiddleware_1.default)(role_utils_1.default.Admin), userController.getAll);
router.get('/:id', (0, authMiddleware_1.default)(), userController.getOne);
router.post('/', (0, authMiddleware_1.default)(role_utils_1.default.Admin), userSchema_1.createSchema, userController.create);
router.delete('/:id', (0, authMiddleware_1.default)(role_utils_1.default.Admin), userController.deleteOne);
router.patch('/:id', (0, authMiddleware_1.default)(role_utils_1.default.Admin), userSchema_1.updateSchema, userController.update);
exports.default = router;

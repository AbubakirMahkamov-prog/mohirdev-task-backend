"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const users_model_1 = require("../db/models/users.model");
const authSchema_1 = require("../middlewares/validators/authSchema");
const router = express_1.default.Router();
const authController = new AuthController_1.default(users_model_1.UserModel);
router.post('/login', authSchema_1.loginSchema, authController.login);
router.post('/registration', authSchema_1.registrationSchema, authController.registration);
exports.default = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_1 = require("../db/models/users.model");
exports.default = (...roles) => {
    roles = roles.length == 0 ? ['user', 'admin'] : roles;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';
            if (!authHeader || !authHeader.startsWith(bearer)) {
                res.status(401).send("Didn't send accound information!");
                return;
            }
            const token = authHeader.replace(bearer, '');
            //verify token
            const decoded = yield jsonwebtoken_1.default.verify(token, config_1.default.SECRET_JWT);
            const user = yield users_model_1.UserModel.findById(decoded.userId);
            if (!user) {
                res.status(401).send("User not found!");
                return;
            }
            if (!roles.includes(user.role)) {
                res.status(401).send("You don't have permission!");
                return;
            }
            req.currentUser = user;
            next();
        }
        catch (err) {
            res.status(401).send(err);
            return;
        }
    });
};

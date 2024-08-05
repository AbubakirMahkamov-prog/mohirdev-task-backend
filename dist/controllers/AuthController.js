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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    constructor(model) {
        this.model = model;
        this.login = this.login.bind(this);
        this.registration = this.registration.bind(this);
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, password: pass } = req.body;
            let model = yield this.model.findOne({
                email: email,
                isDeleted: false
            }).lean();
            if (!model) {
                res.status(404).send({
                    message: "Email not found!"
                });
                return;
            }
            const { password } = model;
            const isMatch = yield bcrypt_1.default.compare(pass, password);
            if (!isMatch) {
                res.status(401).send({
                    password: "Password is mismatch!"
                });
                return;
            }
            const token = jsonwebtoken_1.default.sign({
                userId: model._id,
            }, config_1.default.SECRET_JWT, {
                expiresIn: '1d'
            });
            res.send(Object.assign(Object.assign({}, model), { token }));
        });
    }
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { fullname, email, password } = req.body;
            const passwordHash = yield bcrypt_1.default.hash(password, 10);
            let data = {
                fullname: fullname,
                email: email,
                password: passwordHash
            };
            try {
                const model = yield this.model.create(data);
                res.send(model);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.default = AuthController;

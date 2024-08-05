"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationSchema = exports.loginSchema = void 0;
const zod_express_middleware_1 = require("zod-express-middleware");
const zod_1 = require("zod");
exports.loginSchema = (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string()
    })
});
exports.registrationSchema = (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        fullname: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string()
    })
});

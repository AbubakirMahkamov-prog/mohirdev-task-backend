"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.createSchema = void 0;
const zod_express_middleware_1 = require("zod-express-middleware");
const zod_1 = require("zod");
exports.createSchema = (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        fullname: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
        role: zod_1.z.enum(['user', 'admin']).optional()
    })
});
exports.updateSchema = (0, zod_express_middleware_1.validateRequest)({
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
    body: zod_1.z.object({
        fullname: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
        role: zod_1.z.enum(['user', 'admin']).optional()
    })
});

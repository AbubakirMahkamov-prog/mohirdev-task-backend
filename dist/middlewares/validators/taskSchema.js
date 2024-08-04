"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskUpdateSchema = exports.taskCreateSchema = void 0;
const zod_express_middleware_1 = require("zod-express-middleware");
const zod_1 = require("zod");
exports.taskCreateSchema = (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        content: zod_1.z.string()
    })
});
exports.taskUpdateSchema = (0, zod_express_middleware_1.validateRequest)({
    params: zod_1.z.object({
        id: zod_1.z.string()
    }),
    body: zod_1.z.object({
        title: zod_1.z.string(),
        content: zod_1.z.string()
    })
});

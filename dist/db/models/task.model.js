"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("../index"));
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['new', 'completed'],
        default: 'new'
    },
    owner_id: {
        type: mongoose_1.default.Schema.ObjectId,
        required: true,
        ref: 'users'
    }
});
exports.TaskModel = index_1.default.model('tasks', taskSchema);

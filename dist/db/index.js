"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config/config"));
const db = mongoose_1.default.createConnection(config_1.default.DB_CONNECTION_STRING);
db.once('open', () => {
    console.log("Connection established!");
});
exports.default = db;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const startup_1 = __importDefault(require("./startup/startup"));
const app = (0, express_1.default)();
(0, startup_1.default)(app);
app.listen(config_1.default.PORT, () => console.log(`Server running on ${config_1.default.PORT} 🚀`));

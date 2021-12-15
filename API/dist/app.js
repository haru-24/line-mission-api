"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const todosRouter_js_1 = __importDefault(require("./routes/todosRouter.js"));
const allowedOrigins = ["http://localhost:3000"];
const options = {
    origin: allowedOrigins,
};
app.use((0, cors_1.default)(options));
const PORT = process.env.PORT || 8000;
app.use("/todos", todosRouter_js_1.default);
app.listen(PORT, () => {
    console.log("Server Run PORT:" + PORT);
});

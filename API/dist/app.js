"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const todosRouter_js_1 = __importDefault(require("./routes/todosRouter.js"));
const PORT = process.env.PORT || 8000;
app.use("/todos", todosRouter_js_1.default);
app.listen(PORT, () => {
    console.log("Server Run PORT:" + PORT);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Todo_js_1 = __importDefault(require("../models/Todo.js"));
router.use(express_1.default.json());
// todoのデータ取得
router.get("/", async (req, res) => {
    const get = await Todo_js_1.default.findAll();
    res.send(get);
});
// 詳細用データ
router.get("/detail/:id", async (req, res) => {
    const get = await Todo_js_1.default.findOne({
        where: {
            id: [req.params.id],
        },
    })
        .then((get) => {
        res.send(get);
    })
        .catch((err) => console.log(err));
});
router.post("/", async (req, res) => {
    await Todo_js_1.default.create({
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        finished: req.body.finished,
    })
        .then(() => {
        res.send("todos send ok!");
    })
        .catch((err) => {
        throw err;
    });
});
router.put("/", async (req, res) => {
    const putReq = await Todo_js_1.default.update({ title: req.body.title, description: req.body.description }, { where: { id: req.body.id } })
        .then(() => {
        res.send("chage data");
    })
        .catch((err) => {
        throw err;
    });
});
// todoの完了、未完了 更新
router.put("/finished", async (req, res) => {
    // 完了済みに更新
    if (req.body.finished == true) {
        await Todo_js_1.default.update({ finished: true }, { where: { id: req.body.id } })
            .then(() => {
            res.send("change true");
        })
            .catch((err) => {
            throw err;
        });
    }
    else {
        // 未完了に更新
        await Todo_js_1.default.update({ finished: false }, { where: { id: req.body.id } })
            .then(() => {
            res.send("change false");
        })
            .catch((err) => {
            throw err;
        });
    }
});
// 削除
router.delete("/", async (req, res) => {
    const deleteData = await Todo_js_1.default.findOne({
        where: { id: req.body.id },
    })
        .then((deleteData) => {
        deleteData.destroy();
        res.send("ok delted data!!");
    })
        .catch((err) => {
        throw err;
    });
});
exports.default = router;

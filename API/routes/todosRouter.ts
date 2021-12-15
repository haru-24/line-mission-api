import express from "express";
const router = express.Router();
import Todos from "../models/Todo.js";

router.use(express.json());

// todoのデータ取得
router.get("/", async (req, res) => {
  const get = await Todos.findAll();
  res.send(get);
});

// 詳細用データ
router.get("/detail/:id", async (req, res) => {
  const get = await Todos.findOne({
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
  await Todos.create({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    finished: req.body.finished,
  })
    .then(() => {
      res.send("todos send ok!");
    })
    .catch((err: ErrorEvent) => {
      throw err;
    });
});

router.put("/", async (req, res) => {
  const putReq = await Todos.update(
    { title: req.body.title, description: req.body.description },
    { where: { id: req.body.id } }
  )
    .then(() => {
      res.send("chage data");
    })

    .catch((err: ErrorEvent) => {
      throw err;
    });
});

// todoの完了、未完了 更新
router.put("/finished", async (req, res) => {
  // 完了済みに更新
  if (req.body.finished == true) {
    await Todos.update({ finished: true }, { where: { id: req.body.id } })
      .then(() => {
        res.send("change true");
      })
      .catch((err: ErrorEvent) => {
        throw err;
      });
  } else {
    // 未完了に更新
    await Todos.update({ finished: false }, { where: { id: req.body.id } })
      .then(() => {
        res.send("change false");
      })
      .catch((err: ErrorEvent) => {
        throw err;
      });
  }
});

// 削除
router.delete("/", async (req, res) => {
  const deleteData = await Todos.findOne({
    where: { id: req.body.id },
  })
    .then((deleteData: any) => {
      deleteData.destroy();
      res.send("ok delted data!!");
    })
    .catch((err: ErrorEvent) => {
      throw err;
    });
});

export default router;

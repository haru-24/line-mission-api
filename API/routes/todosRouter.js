const express = require("express");
const router = express.Router();
const Todos = require("../models/Todo.js");
router.use(express.json());

router.get("/", async (req, res) => {
  const get = await Todos.findAll();
  res.send(get);
});

router.post("/", async (req, res) => {
  await Todos.create({
    user_id: req.body.user_id,
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
  const putReq = await Todos.update(
    { title: req.body.title, description: req.body.description },
    { where: { id: req.body.id } }
  )
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
    const putFinished = await Todos.update(
      { finished: true },
      { where: { id: req.body.id } }
    )
      .then(() => {
        res.send("change true");
      })
      .catch((err) => {
        throw err;
      });
  } else {
    // 未完了に更新
    const putFinished = await Todos.update(
      { finished: false },
      { where: { id: req.body.id } }
    )
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
  const deleteData = await Todos.findOne({
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

module.exports = router;

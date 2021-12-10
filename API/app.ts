import express from "express";
const app = express();

import todosRouter from "./routes/todosRouter.js";

const PORT = process.env.PORT || 8000;

app.use("/todos", todosRouter);

app.listen(PORT, () => {
  console.log("Server Run PORT:" + PORT);
});

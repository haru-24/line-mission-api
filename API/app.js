const express = require("express");
const app = express();
const todosRouter = require("./routes/todosRouter.js");
const PORT = process.env.PORT || 8000;

app.use("/todos", todosRouter);

app.listen(PORT, () => {
  console.log("Server Run PORT:" + PORT);
});

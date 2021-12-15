import express from "express";
import cors from "cors";
const app = express();
import todosRouter from "./routes/todosRouter.js";

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

const PORT = process.env.PORT || 8000;

app.use("/todos", todosRouter);

app.listen(PORT, () => {
  console.log("Server Run PORT:" + PORT);
});

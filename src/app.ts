import cors from "cors";
import express from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(errorHandlerMiddleware);

if (process.env.NODE_ENV === "test") {
  console.log("test environment");
  // app.use(e2eRouter);
}

export default app;

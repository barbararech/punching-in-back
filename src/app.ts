import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import dotenv from 'dotenv';
import authRouter from './routers/authRouter';
import applicationRouter from './routers/applicationRouter';
import attachmentRouter from './routers/attachmentRouter';
import stepRouter from './routers/stepRouter';
import e2eRouter from './routers/e2eRouter';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(applicationRouter);
app.use(attachmentRouter);
app.use(stepRouter);
app.use(errorHandlerMiddleware);

if (process.env.NODE_ENV === 'test') {
  /* eslint-disable */
  console.log('test environment');
  app.use(e2eRouter);
}

export default app;

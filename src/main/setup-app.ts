import express from 'express';
import { router as userRouter } from '@main/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

export default app;

import express from "express";
import userRouter from './user.router';
import imageRouter from './image.router';

const rootRouter = express.Router();
rootRouter.use("/user", userRouter);
rootRouter.use("/image", imageRouter);



export default rootRouter;

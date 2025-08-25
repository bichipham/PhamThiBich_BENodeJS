import express from "express";
import restaurantRouter from "./restaurant.router";
import userRouter from "./user.router";

const rootRouter = express.Router();
rootRouter.use("/restaurant", restaurantRouter);
rootRouter.use("/user", userRouter);


export default rootRouter;

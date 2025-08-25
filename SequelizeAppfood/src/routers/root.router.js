import express from "express";
import foodRouter from "./food.router";
import restaurantRouter from "./restaurant.router";
import orderRouter from "./order.router";

const rootRouter = express.Router();
rootRouter.use("/food", foodRouter);
rootRouter.use("/restaurant", restaurantRouter);
rootRouter.use("/order", orderRouter);


export default rootRouter;

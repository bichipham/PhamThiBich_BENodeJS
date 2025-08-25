import express from 'express';
import { orderController } from '../controllers/order.controller';

const orderRouter = express.Router();

orderRouter.post('/', orderController.create);
orderRouter.get('/', orderController.findAll);


export default orderRouter;
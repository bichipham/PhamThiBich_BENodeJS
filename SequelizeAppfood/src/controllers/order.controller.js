import { orderService } from "../services/order.service";

export const orderController = {
   create: async function (req, res, next) {
      const result = await orderService.create(req);
      const response = responseSuccess(result, `Create order successfully`);
      res.status(response.statusCode).json(response);
   },

   findAll: async function (req, res, next) {
      const result = await orderService.findAll(req);
      const response = responseSuccess(result, `Get all orders successfully`);
      res.status(response.statusCode).json(response);
   }
};
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
   },

   findOne: async function (req, res, next) {
      const result = await orderService.findOne(req);
      const response = responseSuccess(result, `Get order #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   update: async function (req, res, next) {
      const result = await orderService.update(req);
      const response = responseSuccess(result, `Update order #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   remove: async function (req, res, next) {
      const result = await orderService.remove(req);
      const response = responseSuccess(result, `Remove order #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   }
};
import { foodService } from "../services/food.service";

export const foodController = {
   create: async function (req, res, next) {
      const result = await foodService.create(req);
      const response = responseSuccess(result, `Create food successfully`);
      res.status(response.statusCode).json(response);
   },

   findAll: async function (req, res, next) {
      const result = await foodService.findAll(req);
      const response = responseSuccess(result, `Get all foods successfully`);
      res.status(response.statusCode).json(response);
   },

   findOne: async function (req, res, next) {
      const result = await foodService.findOne(req);
      const response = responseSuccess(result, `Get food #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   update: async function (req, res, next) {
      const result = await foodService.update(req);
      const response = responseSuccess(result, `Update food #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   remove: async function (req, res, next) {
      const result = await foodService.remove(req);
      const response = responseSuccess(result, `Remove food #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   }
};
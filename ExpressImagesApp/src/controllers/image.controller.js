import { imageService } from "../services/image.service";

export const imageController = {
   create: async function (req, res, next) {
      const result = await imageService.create(req);
      const response = responseSuccess(result, `Create image successfully`);
      res.status(response.statusCode).json(response);
   },

   findAll: async function (req, res, next) {
      const result = await imageService.findAll(req);
      const response = responseSuccess(result, `Get all images successfully`);
      res.status(response.statusCode).json(response);
   },

   findOne: async function (req, res, next) {
      const result = await imageService.findOne(req);
      const response = responseSuccess(result, `Get image #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   update: async function (req, res, next) {
      const result = await imageService.update(req);
      const response = responseSuccess(result, `Update image #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   remove: async function (req, res, next) {
      const result = await imageService.remove(req);
      const response = responseSuccess(result, `Remove image #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   }
};
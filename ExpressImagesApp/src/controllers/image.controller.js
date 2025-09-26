import { responseSuccess } from "../common/helpers/response.helper";
import { imageService } from "../services/image.service";

export const imageController = {
  findAll: async function (req, res, next) {
    const result = await imageService.findAll(req);
    const response = responseSuccess(result, `Get all images successfully`);
    res.status(response.statusCode).json(response);
  },

  findOne: async function (req, res, next) {
    const result = await imageService.findOne(req);
    const response = responseSuccess(
      result,
      `Get image #${req.params.id} successfully`
    );
    res.status(response.statusCode).json(response);
  },
  getComment: async function (req, res, next) {
    console.log('!!!!!!!!1 getComment controller');
    const result = await imageService.getComment(req);
    const response = responseSuccess(
      result,
      `Get image comment successfully`
    );
    res.status(response.statusCode).json(response);
  },
  getSavedByUser: async function (req, res, next) {
    const result = await imageService.getSavedByUser(req);
    const response = responseSuccess(
      result,
      `Get is saved by user successfully`
    );
    res.status(response.statusCode).json(response);
  }
};

import { responseSuccess } from "../common/helpers/response.helper";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";

export const userController = {
  login: async function (req, res, next) {
    const result = await userService.login(req);
    const response = responseSuccess(result, `Login successfully`);
    res.status(response.statusCode).json(response);
  },
  register: async function (req, res, next) {
    const result = await userService.register(req);
    const response = responseSuccess(result, `Register successfully`);
    res.status(response.statusCode).json(response);
  },
  saveImage: async function (req, res, next) {
    res.status(response.statusCode).json("response");
  },
  uploadImage: async function (req, res, next) {
    const result = await userService.uploadImage(req);
    const response = responseSuccess(result, `Upload Image successfully`);
    res.status(response.statusCode).json(response);
  },
  getInfo: async function (req, res, next) {
    const result = await userService.getInfo(req);
    const response = responseSuccess(result, `Get Info successfully`);
    res.status(response.statusCode).json(response);
  },
  getAllUserImage: async function (req, res, next) {
    const result = await userService.getAllUserImage(req);
    const response = responseSuccess(result, `Get all user image successfully`);
    res.status(response.statusCode).json(response);
  },
  comment: async function (req, res, next) {
    const result = await userService.comment(req);
    const response = responseSuccess(result, `User comment successfully`);
    res.status(response.statusCode).json(response);
  },
  deleteImage: async function (req, res, next) {
    const result = await userService.deleteImage(req);
    const response = responseSuccess(result, `Delete image successfully`);
    res.status(response.statusCode).json(response);
  },
  saveImage: async function (req, res, next) {
    const result = await userService.saveImage(req);
    const response = responseSuccess(result, `Save image successfully`);
    res.status(response.statusCode).json(response);
  },
  getSavedImage: async function (req, res, next) {
    const result = await userService.getSavedImage(req);
    const response = responseSuccess(result, `Get saved image successfully`);
    res.status(response.statusCode).json(response);
  },
  updateProfile: async function (req, res, next) {
    const result = await userService.updateProfile(req);
    const response = responseSuccess(result, `Update profile successfully`);
    res.status(response.statusCode).json(response);
  }      

};

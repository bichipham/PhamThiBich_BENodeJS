import { responseSuccess } from "../common/helpers/response.helper";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";


export const userController = {
   order: async function (req, res, next) {
    const result = await userService.order(req);
    const response = responseSuccess(result, `Create order successfully`);
    res.status(response.statusCode).json(response);
   },
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
};
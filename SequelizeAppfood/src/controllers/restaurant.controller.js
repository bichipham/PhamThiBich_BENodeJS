import { responseSuccess } from "../common/helpers/response.helper";
import { restaurantService } from "../services/restaurant.service";

export const restaurantController = {
  toggleLike: async function (req, res, next) {
   console.log("restaurantController -> toogleLike -> req.body", req.body);
    const result = await restaurantService.toggleLike(req);
    const response = responseSuccess(result, `ToggleLike res successfully`);
    res.status(response.statusCode).json(response);
  },
  findAll: async function (req, res, next) {
    const result = await restaurantService.findAll(req);
    const response = responseSuccess(result, `Get all like res successfully`);
    res.status(response.statusCode).json(response);
  },
  getLikeByRes: async function (req, res, next) {
    console.log("restaurantController -> getLikeByRes -> req.query", req.query);
    const result = await restaurantService.getLikeByRes(req);
    const response = responseSuccess(result, `Get like by res successfully`);
    res.status(response.statusCode).json(response);
  },
  getLikeByUser: async function (req, res, next) {
    console.log("restaurantController -> getLikeByUser -> req.query", req.query);
    const result = await restaurantService.getLikeByUser(req);
    const response = responseSuccess(result, `Get like by user successfully`);
    res.status(response.statusCode).json(response);
  },
  addRate : async function (req, res, next) {   
      const result = await restaurantService.addRate(req);
      const response = responseSuccess(result, `Rate res successfully`);
      res.status(response.statusCode).json(response); 
  },
  getRateByRes: async function (req, res, next) {
		console.log("restaurantController -> getRateByRes -> req.query", req.query);
		const result = await restaurantService.getRateByRes(req);
		const response = responseSuccess(result, `Get rate by res successfully`);
		res.status(response.statusCode).json(response);
  },
	getRateByUser: async function (req, res, next) {
		console.log("restaurantController -> getRateByUser -> req.query", req.query);
		const result = await restaurantService.getRateByUser(req);
		const response = responseSuccess(result, `Get rate by user successfully`);
		res.status(response.statusCode).json(response);
	}
};

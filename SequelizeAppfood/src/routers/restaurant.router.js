import express from 'express';
import { restaurantController } from '../controllers/restaurant.controller';

const restaurantRouter = express.Router();

restaurantRouter.post('/toggle-like', restaurantController.toggleLike);
restaurantRouter.get('/', restaurantController.findAll);
restaurantRouter.get('/like-by-res', restaurantController.getLikeByRes);
restaurantRouter.get('/like-by-user', restaurantController.getLikeByUser);


export default restaurantRouter;
import express from 'express';
import { restaurantController } from '../controllers/restaurant.controller';

const restaurantRouter = express.Router();

restaurantRouter.post('/toggle-like', restaurantController.toggleLike);
restaurantRouter.get('/', restaurantController.findAll);
restaurantRouter.get('/like-by-res/:id', restaurantController.getLikeByRes);
restaurantRouter.get('/like-by-user/:id', restaurantController.getLikeByUser);
restaurantRouter.post('/rate', restaurantController.addRate);
restaurantRouter.get('/rate-by-res/:id', restaurantController.getRateByRes);
restaurantRouter.get('/rate-by-user/:id', restaurantController.getRateByUser);


export default restaurantRouter;
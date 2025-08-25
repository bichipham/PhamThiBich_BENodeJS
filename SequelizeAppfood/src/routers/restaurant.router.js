import express from 'express';
import { restaurantController } from '../controllers/restaurant.controller';
import { protect } from '../common/middlewares/protect.middleware';

const restaurantRouter = express.Router();

restaurantRouter.post('/toggle-like', protect, restaurantController.toggleLike);
restaurantRouter.get('/', restaurantController.findAll);
restaurantRouter.get('/like-by-res/:id', restaurantController.getLikeByRes);
restaurantRouter.get('/like-by-user/:id', restaurantController.getLikeByUser);
restaurantRouter.post('/rate', protect, restaurantController.addRate);
restaurantRouter.get('/rate-by-res/:id', restaurantController.getRateByRes);
restaurantRouter.get('/rate-by-user/:id', restaurantController.getRateByUser);


export default restaurantRouter;
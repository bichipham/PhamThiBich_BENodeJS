import express from 'express';
import { foodController } from '../controllers/food.controller';

const foodRouter = express.Router();

// Tạo route CRUD
foodRouter.post('/', foodController.create);
foodRouter.get('/', foodController.findAll);
foodRouter.get('/:id', foodController.findOne);
foodRouter.patch('/:id', foodController.update);
foodRouter.delete('/:id', foodController.remove);

export default foodRouter;
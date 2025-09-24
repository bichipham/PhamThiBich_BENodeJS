import express from 'express';
import { imageController } from '../controllers/image.controller';

const imageRouter = express.Router();

// Tạo route CRUD
imageRouter.get('/', imageController.findAll);
imageRouter.get('/:id', imageController.findOne);

export default imageRouter;
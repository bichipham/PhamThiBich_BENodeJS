import express from 'express';
import { imageController } from '../controllers/image.controller';
import { protect } from '../common/middlewares/protect.middleware';

const imageRouter = express.Router();

// Tạo route CRUD
imageRouter.get('/', protect, imageController.findAll);
imageRouter.get('/:id',protect, imageController.findOne);
imageRouter.get('/:id/comment',protect, imageController.getComment);


export default imageRouter;
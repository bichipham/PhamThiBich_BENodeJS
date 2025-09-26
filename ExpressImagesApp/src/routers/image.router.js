import express from 'express';
import { imageController } from '../controllers/image.controller';
import { protect } from '../common/middlewares/protect.middleware';

const imageRouter = express.Router();

imageRouter.get('/', protect, imageController.findAll);
imageRouter.get('/:id',protect, imageController.findOne);
imageRouter.get('/:id/comment',protect, imageController.getComment);
imageRouter.get('/:id/is-saved-by-user', protect, imageController.getSavedByUser);


export default imageRouter;
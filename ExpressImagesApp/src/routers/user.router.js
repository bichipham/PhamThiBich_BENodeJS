import express from 'express';
import { userController } from '../controllers/user.controller';
import { protect } from '../common/middlewares/protect.middleware';
import { uploadCloud } from '../common/multer/cloud.multer';

const userRouter = express.Router();

userRouter.post('/save-image', protect, userController.saveImage);
userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);
userRouter.get('/get-info', protect, userController.getInfo);
userRouter.post("/upload-image", protect, uploadCloud.single("image"), userController.uploadImage);
userRouter.get('/:id/images', protect, userController.getAllUserImage);


export default userRouter;
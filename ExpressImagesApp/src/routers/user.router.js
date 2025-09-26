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
userRouter.delete('/delete-image/:id', protect, userController.deleteImage);
userRouter.post('/comment', protect, userController.comment);
userRouter.post('/save-image/:id', protect, userController.saveImage);
userRouter.get('/save-image', protect, userController.getSavedImage);
userRouter.post('/update-profile', protect, uploadCloud.single("avatar"),userController.updateProfile);



export default userRouter;
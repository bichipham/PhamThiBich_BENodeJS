import express from 'express';
import { userController } from '../controllers/user.controller';
import { protect } from '../common/middlewares/protect.middleware';

const userRouter = express.Router();

userRouter.post('/order', protect, userController.order);
userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);


export default userRouter;
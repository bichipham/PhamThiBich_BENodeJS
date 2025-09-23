import express from 'express';

const imageRouter = express.Router();

// Tạo route CRUD
imageRouter.post('/', imageController.create);
imageRouter.get('/', imageController.findAll);
imageRouter.get('/:id', imageController.findOne);
imageRouter.patch('/:id', imageController.update);
imageRouter.delete('/:id', imageController.remove);

export default imageRouter;
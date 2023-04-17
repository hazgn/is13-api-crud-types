import express from "express";
import usersController from "../controllers/users.controller";

const userRouter:any = express.Router();

userRouter.post('/', usersController.create);
userRouter.get('/', usersController.readAll);
userRouter.get('/:id', usersController.readById);
userRouter.patch('/:id', usersController.updateById);
userRouter.delete('/:id', usersController.removeById)

export default userRouter;
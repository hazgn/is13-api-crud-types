import express from "express";
import productsController from "../controllers/products.controller";

const productRouter:any = express.Router();

productRouter.post('/', productsController.create);
productRouter.get('/', productsController.readAll);
productRouter.get('/:id', productsController.readById);
productRouter.patch('/:id', productsController.updateById);
productRouter.delete('/:id', productsController.removeById)

export default productRouter;
import express, { Request, Response } from "express";
import response from "../helpers/response";
import productRouter from "./products.route";

const router = express.Router();

router.get('/', (req:Request, res:Response) : Response => {
    return response(res, 200, { message : 'Wellcome to API types' });
});
router.use('/products', productRouter);

export default router

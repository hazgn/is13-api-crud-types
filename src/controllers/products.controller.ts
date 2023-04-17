import { Request,Response } from "express"
import response from "../helpers/response"
import productsModel from "../models/products.model";

const create = async (req:Request, res:Response) : Promise<Response> => {
    const numPattern = /[^0-9]$/;
    if(!req.body.product_name || !req.body.product_price || !req.body.description) return response(res, 400, {message:'Must be Input product_name, product_price, and description'});

    if(numPattern.test(req.body.product_price)) return response(res, 400, { message:'product_price must be number' });

    try {

        const result = await productsModel.create(req.body);

        return response(res, 201, result);
    } catch (error) {
        return response(res, 500, error);
    }
}

const readAll = async (req:Request, res: Response): Promise<Response> => {
    try {
        const result = await productsModel.readAll()
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error);
    }
}

const readById = async (req:Request, res:Response) : Promise<Response> => {
    if(!req.params.id.match(/^[0-9]+$/)) return response(res, 400, { message : 'id must be number' })
    try {
        const result = await productsModel.readById(Number(req.params.id));
        
        if(!result) return response(res, 400, {message:'Product Not Found!'});

        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error);
    }
}

const updateById = async (req:Request, res:Response) : Promise<Response> => {
    if(!req.params.id.match(/^[0-9]+$/)) return response(res, 400, { message : 'id must be number' });

    try {
        const checkProducts = await productsModel.readById(Number(req.params.id));

        if(!checkProducts) return response(res, 400, {message:'Product Not Found!'});

        if(!req.body.product_name) req.body.product_name = checkProducts?.product_name;
        if(!req.body.product_price) req.body.product_price = checkProducts?.product_price;
        if(!req.body.description) req.body.description = checkProducts?.description;

        const result = await productsModel.updateById(Number(req.params.id), req.body);
    
        return response(res, 200, result);
    } catch (error) {
        return response(res, 500, error);
    }
}

const removeById = async (req:Request, res:Response) : Promise<Response> => {
    if(!req.params.id.match(/^[0-9]+$/)) return response(res, 400, { message : 'id must be number' });

    try {

        const result = await productsModel.removeById(Number(req.params.id))

        return response(res, result === 1 ? 200 : 400, {
            message: result === 1 ? true : false
        })
    } catch (error) {
        return response(res, 500, error);
    }
}

export default {
    create,
    readAll,
    readById,
    updateById,
    removeById
}
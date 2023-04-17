import { Request,Response } from "express"
import response from "../helpers/response"
import usersModel from "../models/users.model";

const create = async (req:Request, res:Response) : Promise<Response> => {

    if(!req.body.email || !req.body.name || !req.body.username) return response(res, 400, {message:'Must be Input name, email, and username'});

    try {

        const result = await usersModel.create(req.body);

        return response(res, 201, result);
    } catch (error) {
        return response(res, 500, error);
    }
}

const readAll = async (req:Request, res: Response): Promise<Response> => {
    try {
        const result = await usersModel.readAll()
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error);
    }
}

const readById = async (req:Request, res:Response) : Promise<Response> => {
    if(!req.params.id.match(/^[0-9]+$/)) return response(res, 400, { message : 'id must be number' })
    try {
        const result = await usersModel.readById(Number(req.params.id));
        
        if(!result) return response(res, 400, {message:'User Not Found!'});

        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error);
    }
}

const updateById = async (req:Request, res:Response) : Promise<Response> => {
    if(!req.params.id.match(/^[0-9]+$/)) return response(res, 400, { message : 'id must be number' });
    try {
        const checkUser = await usersModel.readById(Number(req.params.id));

        if(!checkUser) return response(res, 400, {message:'User Not Found!'});

        if(!req.body.name) req.body.name = checkUser?.name;
        if(!req.body.email) req.body.email = checkUser?.email;
        if(!req.body.username) req.body.username = checkUser?.username;

        const result = await usersModel.updateById(Number(req.params.id), req.body);
    
        return response(res, 200, result);
    } catch (error) {
        return response(res, 500, error);
    }
}

const removeById = async (req:Request, res:Response) : Promise<Response> => {
    if(!req.params.id.match(/^[0-9]+$/)) return response(res, 400, { message : 'id must be number' });

    try {
        const checkUser = await usersModel.readById(Number(req.params.id));

        if(!checkUser) return response(res, 400, {message:'User Not Found!'});

        const result = await usersModel.removeById(Number(req.params.id))

        return response(res, 200, {
            message: `Delete id ${result}`
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
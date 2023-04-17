import { Response } from "express"
import { Res } from "../types/response.type";

export default (res:Response, status:number, result:any) : Response => {
    let desc:string = '';

    switch (status) {
        case 200:
            desc = 'OK';
            break;
        
        case 201:
            desc = 'Created';
            break;

        case 400:
            desc = 'Bad Request';
            break;
        
        case 500:
            desc = 'Internal Server Error';
            break;
        
        case 501:
            desc = 'Bad Gateway'
            break;

        case 304:
            desc = 'Not Modified';
            break;
    
        default:
            desc = '';
            break;
    }

    const results:Res = {
        status:status,
        description :desc,
        result:result
    }

    return res.status(status).json(results)
}
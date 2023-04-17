import db from "../config/db";
import { IProduct } from "../interfaces/product.interface";
import {OkPacket} from 'mysql2'

const create = (body:IProduct) : Promise<IProduct> => {
    return new Promise((resolve, reject) =>  {
        db.query<OkPacket>('INSERT INTO products SET ?', [body], (err, result) => {
            if(err) reject(err);
            readById(result.insertId).then(user => resolve(user!)).catch(reject)
        })
    })
}

const readAll = () : Promise<IProduct[]> => {
    return new Promise((resolve, reject) => {
        db.query<IProduct[]>('SELECT * FROM products', (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}

const readById = (id:number) : Promise<IProduct | undefined> => {
    return new Promise((resolve, reject) => {
        db.query<IProduct[]>('SELECT * FROM products WHERE id = ?', [id], (err, result) => {
            if(err) reject(err);
            resolve(result?.[0]);
        })
    })
}

const updateById = (id:number, body:IProduct) : Promise<IProduct | undefined> => {
    return new Promise((resolve, reject) => {
        db.query<OkPacket>('UPDATE products SET ? WHERE id = ?', [body, id], (err, result) => {
            if (err) reject(err);
            readById(id!).then(resolve).catch(reject);
        })
    })
}

const removeById = (id:number) : Promise<number> => {
    return new Promise((resolve, reject) => {
        db.query<OkPacket>('DELETE FROM products WHERE id = ?', [id], (err, result) => {
            console.log(result);
            if(err) reject(err);
            resolve(result.affectedRows);
        })
    })
} 

export default {
    create,
    readAll,
    readById,
    updateById,
    removeById
}
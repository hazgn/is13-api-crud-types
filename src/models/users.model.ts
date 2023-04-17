import db from "../config/db";
import { IUSer } from "../interfaces/user.interface";
import {OkPacket} from 'mysql2'

const create = (body:IUSer) : Promise<IUSer> => {
    return new Promise((resolve, reject) =>  {
        db.query<OkPacket>('INSERT INTO users SET ?', [body], (err, result) => {
            if(err) reject(err);
            readById(result.insertId).then(user => resolve(user!)).catch(reject)
        })
    })
}

const readAll = () : Promise<IUSer[]> => {
    return new Promise((resolve, reject) => {
        db.query<IUSer[]>('SELECT * FROM users', (err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}

const readById = (id:number) : Promise<IUSer | undefined> => {
    return new Promise((resolve, reject) => {
        db.query<IUSer[]>('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
            if(err) reject(err);
            resolve(result?.[0]);
        })
    })
}

const updateById = (id:number, body:IUSer) : Promise<IUSer | undefined> => {
    return new Promise((resolve, reject) => {
        db.query<OkPacket>('UPDATE users SET ? WHERE id = ?', [body, id], (err, result) => {
            if (err) reject(err);
            readById(id!).then(resolve).catch(reject);
        })
    })
}

const removeById = (id:number) : Promise<number> => {
    return new Promise((resolve, reject) => {
        db.query<OkPacket>('DELETE FROM users WHERE id = ?', [id], (err, res) => {
            if(err) reject(err);
            resolve(res.affectedRows);
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
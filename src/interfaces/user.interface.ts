import { RowDataPacket } from 'mysql2'

export interface IUSer extends RowDataPacket {
    id?:number,
    name: string,
    email:string,
    username:string
}
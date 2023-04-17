import env from "../helpers/env";
import mysql from "mysql2";

const db = mysql.createConnection({
    host: env.HOST,
    user: env.UNAME,
    password: env.PASS,
    database: env.DB,
    port: Number(env.DB_PORT)
});

db.connect((err):void => {
    if(err) return console.log('Database is Error ?', err);

    return console.log('Database is connected');
});

export default db;
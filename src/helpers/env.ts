import * as dotenv from 'dotenv';

dotenv.config();

export default {
    PORT : process.env.PORT || 8000,
    HOST : process.env.HOST,
    UNAME : process.env.UNAME,
    PASS : process.env.PASS,
    DB : process.env.DB,
    DB_PORT : process.env.DB_PORT
}
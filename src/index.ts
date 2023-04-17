import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import './config/db';
import env from './helpers/env';
import router from './routes';

const server:Express = express();

const port:number = Number(env.PORT) || 8000;

const logger:any = morgan(":method :url :status :res[content-length] - :response-time ms");

server.listen(port, () : void => {
    console.log('Server is Connected on Port : ', port);
})

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(logger);
server.use(router);
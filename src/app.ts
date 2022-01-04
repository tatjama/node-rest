import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if(dotenvResult.error){
    throw dotenvResult.error;
}
import express from 'express';
import http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { CommonRoutesConfig } from './common/common.routes.config';
import cors from 'cors';
import debug from 'debug';
import { UsersRoutes } from './users/users.routes.config';
import { AuthRoutes } from './auth/auth.routes.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

//Adding middleware to parse all incoming request as JSON
app.use(express.json());

//Adding Middleware for cross-origin requests
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({all: true}),
    ),
};

if(!process.env.DEBUG) {
    loggerOptions.meta = false;
}

//Initialize the logger
app.use(expressWinston.logger(loggerOptions));

//Adding Auth Routes to array of routes - independent
routes.push( new AuthRoutes(app));

//Adding User Routes to array of routes
routes.push( new UsersRoutes(app));

const PORT = process.env.PORT || 3000;
const runningMessages = `Listening port ${PORT}`;

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessages);
})

//Start our server
server.listen(PORT, () => {
    routes.forEach(route =>{
        debugLog(`Routes configure for route ${route.getName()}`);
    })
    console.log(runningMessages);
});
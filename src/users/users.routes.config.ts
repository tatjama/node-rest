import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application){
        super(app, 'UsersRoutes')
    }

    configureRoutes(): express.Application {
        this.app.route('/users')
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send('List of users')
            })
            .post((req: express.Request, res: express.Response) => {
                res.status(200).send('Post of users')
            })

        this.app.route('/users/:id')
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                next();
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`GET requested for user id + ${req.params.id}`);
            })
            .put((req: express.Request, res: express.Response) => {
                res.status(200).send(`PUT requested for user id + ${req.params.id}`);
            })
            .patch((req: express.Request, res: express.Response) => {
                res.status(200).send(`PATCH requested for user id + ${req.params.id}`)
            })
            .delete((req: express.Request, res: express.Response) => {
                res.status(200).send(`DELETE requested for user id ${req.params.id}`)
            })

        return this.app;
    }
}
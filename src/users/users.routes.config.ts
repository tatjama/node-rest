import express from 'express';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import { CommonRoutesConfig } from '../common/common.routes.config';
import usersController from './controllers/users.controller';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application){
        super(app, 'UsersRoutes')
    }

    configureRoutes(): express.Application {
        this.app
            .route('/users')
            .get(UsersController.listUsers)
            .post(
                UsersMiddleware.validateRequiredUserBodyFields,
                UsersMiddleware.validateSameEmailBelongToSameUser,
                UsersController.createUser
            )
        
        this.app.param('userId', UsersMiddleware.extractUserId)

        this.app
            .route('/users/:id')
            .all(UsersMiddleware.validateUserExists)
            .get(UsersController.getUserById)
            .put(
                UsersMiddleware.validateRequiredUserBodyFields,
                UsersMiddleware.validateSameEmailBelongToSameUser,
                UsersController.put
            )
            .patch(
                UsersMiddleware.validatePatchEmail,
                UsersController.patch
            )
            .delete(usersController.removeUser)

        return this.app;
    }
}
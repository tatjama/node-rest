import express from 'express';
import UserService from '../../users/services/user.service';
import argon2 from 'argon2';

class AuthMiddleware{
    async verifyUserPassword( req: express.Request, res: express.Response, next: express.NextFunction){
        const user: any = await UserService.getUserByEmailWithPassword(req.body.email);
        if (user){
            const passwordHash = user.password;
            if (await argon2.hash(passwordHash, req.body.password)){
                req.body = {
                    userId: user._id,
                    userPassword: user.password,
                    permissionFlags: user.permissionFlags
                }                
                return next();
            }

        }
        res.status(400).send({ errors: ['Invalid email and/or password'] });

    }
}

export default new AuthMiddleware();



  
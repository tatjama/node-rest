import express from 'express';
import userService from '../../users/services/user.service';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Jwt } from '../../common/types/jwt';


const jwtSecret: string = process.env.JWT_SECRET || 'jwtSecret';

class JwtMiddleWare{
    
    verifyRefreshBodyField( req: express.Request, res: express.Response, next: express.NextFunction ) {
       return (req.body && req.body.refreshToken )? next(): res.status(400).send({ errors: 'Missing refresh token' });        
    }
    
    async validRefreshNeeded( req: express.Request, res: express.Response, next: express.NextFunction){
        console.log(res.locals)
        const user: any = await userService.readById(res.locals.jwt.userId);
        console.log(user);
        console.log(Buffer.from(res.locals.jwt.refreshKey.data));
        const salt = crypto.createSecretKey( Buffer.from(res.locals.jwt.refreshKey.data));
        const hash = crypto.createHmac('sha512', salt).update(res.locals.jwt.userId + jwtSecret).digest('base64');
        console.log(hash);
        console.log(req.body.refreshToken);
        if(hash === req.body.refreshToken){
            req.body = { 
                userId: user._id,
                email: user.email,
                permissionFlags: user.permissionFlags,
            };
            return next();
        }else{
            res.status(400).send({errors: ['Invalid refresh token']});
        }
    }


    validJWTNeeded( req: express.Request, res: express.Response, next: express.NextFunction){
        
        if(req.headers['authorization']){
            try{
                const authorization = req.headers['authorization'].split(' ');
                if(authorization[0] !== 'Bearer'){
                   return res.status(401).send();
                }else{
                    res.locals.jwt = jwt.verify(authorization[1], jwtSecret) as Jwt;
                    next();
                }
            }catch(err){
               return res.status(403).send();
            }
        }else{
           return res.status(401).send();
        }
    }
}

export default new JwtMiddleWare();
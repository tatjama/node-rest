import express, { Response } from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const log: debug.IDebugger= debug('app:auth-controller');
const jwtSecret: string | string = process.env.JWT_SECRET || 'jwtSecret';
const tokenExpirationInSeconds:number = 36000;

export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
  }

export type ErrorResponse = { error: string }

class AuthController{
    
    async createJWT(req: express.Request, res: express.Response)
    : Promise<express.Response<AuthResponse | ErrorResponse>>{
        try{ 
            const refreshId = req.body.userId + jwtSecret;
            const salt = crypto.createSecretKey(crypto.randomBytes(16));
            const hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');
            req.body.refreshKey = salt.export();
            const token = jwt.sign(req.body, jwtSecret, {expiresIn: tokenExpirationInSeconds});
            return res.status(201).send({ accessToken: token, refreshToken: hash})
        }catch(err){
            log('create JWT error: %0', err);
            return res.status(500).send();
        }
    }
}

export default new AuthController();
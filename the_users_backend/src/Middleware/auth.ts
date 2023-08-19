import { auth } from '../firebaseConfig';
import express, { Request, Response, NextFunction } from 'express';

interface DecodedUserToken {
    admin?: boolean;
    [key: string]: any;

}
declare module 'express-serve-static-core' {
    interface Request {
        user?: DecodedUserToken;
    }
}

async function verifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization;
    try {
      
        if (!token) {
             res.status(401).send({ message: 'No authorization token provided.' });
             return;
        }

     
        const decodedToken: DecodedUserToken = await auth.verifyIdToken(token);
        if (decodedToken) {
            req.user = decodedToken;
            next();
        } else {
            res.status(401).send({ message: 'Token verification failed.' });
        }
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).send({ message: 'Internal server error during token verification.' });
    }
}

async function verifyAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization;
    try {

        if (!token) {
            res.status(401).send({ message: 'No authorization token provided.' });
            return;
       }
        const decodedToken: DecodedUserToken = await auth.verifyIdToken(token);
        if (decodedToken.admin) {
            next();
        } else {
            res.status(403).send('Access denied: You are not an admin');
        }
    } catch (error) {
        res.status(500).send('Error verifying token');
    }
}

export { verifyUser, verifyAdmin };

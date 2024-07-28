import config from "../config/config";
import type { NextFunction, Request, Response  } from 'express'
import jwt from 'jsonwebtoken';
import { UserModel } from '../db/models/users.model'
type roleType = 'user' | 'admin';


export default (...roles: roleType[]) => {
    roles = roles.length == 0 ? ['user', 'admin']: roles;
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer '
            if (!authHeader || !authHeader.startsWith(bearer)) {
                res.status(401).send("Didn't send accound information!")
                return;
            }
            const token = authHeader.replace(bearer, '');
            //verify token
            const decoded = await jwt.verify(token, config.SECRET_JWT) as any;
            const user = await UserModel.findById(decoded.userId)
            if(!user) {
                res.status(401).send("User not found!")
                return;
            }
            if(!roles.includes(user.role as roleType)) {
                res.status(401).send("You don't have permission!")
                return;
            }
            req.currentUser = user;
            next()
        } catch(err: any) {
            res.status(500).send(err);
            return;
        }
    }
}
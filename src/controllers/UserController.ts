import BaseController from './BaseController';
import type { Document, Model, Schema } from 'mongoose';
import { IUser } from "../db/models/users.model";
import { Request, Response } from 'express';
class UserController<T> extends BaseController<Model <IUser>> {
    constructor(model: Model<T>) {
        super(model as any);
    }

    override async create(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        res.send([])
    }
}


export default  UserController
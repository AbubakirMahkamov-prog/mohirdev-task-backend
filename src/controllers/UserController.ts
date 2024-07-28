import BaseController from './BaseController';
import type { Document, Model, Schema } from 'mongoose';
import { IUser } from "../db/models/users.model";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
class UserController<T> extends BaseController<Model <IUser>> {
    constructor(model: Model<T>) {
        super(model as any);
    }
    override async create(req: Request, res: Response): Promise<void> {
        let { fullname, email, password, role } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        let data: Partial<IUser> = {
            fullname: fullname,
            email: email,
            password: passwordHash
        }
        if(role) data['role'] = role;
        try {
            const model = await this.model.create(data);
            res.send(model)
        } catch (error) {
            res.status(500).send(error)
        }
    }
    override async update(req: Request, res: Response): Promise<void> {
        let { fullname, email, password, role } = req.body;
        const { id } = req.params;
        const passwordHash = await bcrypt.hash(password, 10)
        let data: Partial<IUser> = {
            fullname: fullname,
            email: email,
            password: passwordHash,
            role: role
        }
        try {
            const model = await this.model.updateOne({ _id: id }, data);
            res.send(model)
        } catch (error) {
            res.status(500).send(error)
        }

    }
}


export default  UserController
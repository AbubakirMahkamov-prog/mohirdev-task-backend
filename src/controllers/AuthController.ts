import config from "../config/config";
import type { Model } from 'mongoose';
import type { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from "../db/models/users.model";

class AuthController<T> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model =  model;
        this.login = this.login.bind(this)
        this.registration = this.registration.bind(this)
    }
    async login (req: Request, res: Response): Promise<void> {
        let { email, password: pass } = req.body;
        let model = await this.model.findOne({
            email: email,
            isDeleted: false
        }).lean()
        if (!model) {
            res.status(404).send({
                message: "Email not found!"
            })
            return;
        }
        const { password } = model as any;
        const isMatch = await bcrypt.compare(pass, password);
        if(!isMatch) {
            res.status(401).send({
                password: "Password is mismatch!"
            })
            return;
        }
        const token = jwt.sign({
            userId: model._id,
        }, config.SECRET_JWT, {
            expiresIn: '1d'
        })

        res.send({
            ...model,
            token
        })
    }
    async registration (req: Request, res: Response): Promise<void> {
        let { fullname, email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        let data: Partial<IUser> = {
            fullname: fullname,
            email: email,
            password: passwordHash
        }
        try {
            const model = await this.model.create(data);
            res.send(model)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export default AuthController
import config from "../config/config";
import type { Model } from 'mongoose';
import type { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
class AuthController<T> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model =  model;
        this.login = this.login.bind(this)
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
}

export default AuthController
import BaseController from "./BaseController";
import { Request, Response } from 'express';
import type { Document, Model, Schema } from 'mongoose';

class TaskController <T> extends BaseController<T> {
    constructor(model: Model<T>) {
        super(model as any);
        this.getMine = this.getMine.bind(this);

    }
    override async create(req: Request, res: Response): Promise<void> {
        const currentUser = req.currentUser;
        const { title, content } = req.body;
        const model = await this.model.create({
            title,
            content,
            owner_id: currentUser._id,
        })
        res.send(model);
    }
    override async update(req: Request, res: Response): Promise<void> {
        const currentUser = req.currentUser;
        const { id } = req.params;
        const { title, content } = req.body;
        const model = await this.model.updateOne({ _id: id , owner_id: currentUser.id }, { title, content })
        res.send(model);
    }
    async getMine(req: Request, res: Response): Promise<void> {
        const currentUser = req.currentUser;
        try {
            const modelList = await this.model.find({
                owner_id: currentUser._id,
            })

            res.send(modelList)
        } catch(err) {
            console.log(err)
            res.status(500).send(err)
        }
    }
}

export default TaskController;
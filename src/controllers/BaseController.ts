import type { Model } from 'mongoose';
import type { Request, Response } from 'express';

class BaseController<T> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.update = this.update.bind(this);
    }

    async create(req: Request, res: Response): Promise<void> {
        const data = req.body;
        const model = await this.model.create(data);
        res.send(model);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const modelList = await this.model.find();
        res.send(modelList);
    }

    async getOne(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const model = await this.model.findById(id);
        res.send(model);
    }

    async deleteOne(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await this.model.deleteOne({ _id: id });
        res.send({ id: id });
    }

    async update(req: Request, res: Response): Promise<void> {
        const data = req.body;
        const { id } = req.params;
        const model = await this.model.updateOne({ _id: id }, data);
        res.send(model);
    }
}

export default BaseController;

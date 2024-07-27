import type { Model } from 'mongoose';
import type { Request, Response } from 'express';

class BaseController<T> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    create = async (req: Request, res: Response) => {
        const data = req.body;
        const model = await this.model.create(data);
        res.send(model);
    };

    getAll = async (req: Request, res: Response) => {
        const modelList = await this.model.find();
        res.send(modelList);
    };

    getOne = async (req: Request, res: Response) => {
        const { id } = req.params;
        const model = await this.model.findById(id);
        res.send(model);
    };

    deleteOne = async (req: Request, res: Response) => {
        const { id } = req.params;
        await this.model.deleteOne({ _id: id });
        res.send({ id: id });
    };

    update = async (req: Request, res: Response) => {
        const data = req.body;
        const { id } = req.params;
        const model = await this.model.updateOne({ _id: id }, data);
        res.send(model);
    };
}

export default BaseController;

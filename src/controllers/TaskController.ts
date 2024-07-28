import BaseController from "./BaseController";
import { Request, Response } from 'express';
import type { Document, Model, Schema } from 'mongoose';

class TaskController <T> extends BaseController<T> {
    constructor(model: Model<T>) {
        super(model as any);
    }
    override async create(req: Request, res: Response): Promise<void> {
        
    }
}

export default TaskController;
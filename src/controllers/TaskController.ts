import BaseController from "./BaseController";
import { Request, Response } from 'express';
import type { Document, Model, Schema } from 'mongoose';

class TaskController <T> extends BaseController<T> {
    constructor(model: Model<T>) {
        super(model as any);
        this.getMineNew = this.getMineNew.bind(this);
        this.getMineCompleted = this.getMineCompleted.bind(this);
        this.setCompleted = this.setCompleted.bind(this);
        this.setNew = this.setNew.bind(this);
        this.getStatistic = this.getStatistic.bind(this)

    }
    override async getOne(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const model = await this.model.findOne({
            _id: id,
        });
        res.send(model);
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
    async getMineNew(req: Request, res: Response): Promise<void> {
        const currentUser = req.currentUser;
        try {
            const modelList = await this.model.find({
                owner_id: currentUser._id,
                status: 'new'
            })

            res.send(modelList)
        } catch(err) {
            console.log(err)
            res.status(500).send(err)
        }
    }
    async getMineCompleted(req: Request, res: Response): Promise<void> {
        const currentUser = req.currentUser;
        try {
            const modelList = await this.model.find({
                owner_id: currentUser._id,
                status: 'completed'
            })

            res.send(modelList)
        } catch(err) {
            console.log(err)
            res.status(500).send(err)
        }
    }

    async changeStatus(_id: string, owner_id: string, status: 'new' | 'completed'): Promise<any> {
        const model = await this.model.updateOne({
            _id: _id,
            owner_id: owner_id,
        }, {
            status: status,
        })
        return model;
    }

    async setNew(req: Request, res: Response): Promise<void> {
        const currentUser = req.currentUser;
        const { id } = req.params;
        const model = await this.changeStatus(id, currentUser._id, 'new');
        res.send(model)
    }
    async setCompleted(req: Request, res: Response): Promise<void> {
        const currentUser = req.currentUser;
        const { id } = req.params;  
        const model = await this.changeStatus(id, currentUser._id, 'completed');
        res.send(model)
    }

    async getStatistic(req: Request, res: Response): Promise<void> {
        const modelList = await this.model.aggregate([
            {
                $lookup: {
                    from: 'users', // The name of the users collection
                    localField: 'owner_id',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            {
                $unwind: '$users' // Unwind the user array
            },
            {
                $group: {
                  _id: '$owner_id',
                  fullname: { $first: '$users.fullname' }, // Extract the user's full name
                  newTasksCount: {
                    $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] }
                  },
                  completedTasksCount: {
                    $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
                  }
                }
              },
              {
                $project: {
                  _id: 0,
                  owner_id: '$_id',
                  fullname: 1,
                  newTasksCount: 1,
                  completedTasksCount: 1,
                }
              }
        
        ]);
        res.send(modelList);
    }
}

export default TaskController;
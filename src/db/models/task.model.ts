import mongoose, { Document, Schema, Model } from 'mongoose';
import db from '../index';

export interface ITask extends Document {
   title: string;
   content: string;
   status: 'new' | 'completed';
   owner_id: string;
}

const taskSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['new', 'completed'],
        default: 'new'
    },
    owner_id: {
        type: String,
        required: true,
    }
});

export const TaskModel: Model<ITask> = db.model<ITask>('tasks', taskSchema);


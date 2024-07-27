import mongoose, { Document, Schema, Model } from 'mongoose';
import db from '../index';

export interface IUser extends Document {
    fullname: string;
    email: string;
    password: string;
    role: string;
}

const userSchema: Schema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

export const UserModel: Model<IUser> = db.model<IUser>('User', userSchema);


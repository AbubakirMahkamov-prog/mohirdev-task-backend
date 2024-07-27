import BaseController from './BaseController';
import type { Document, Model, Schema } from 'mongoose';
import { IUser } from "../db/models/users.model";
class UserController extends BaseController<Model <IUser>> {
    
}


export default  UserController
import { UserModel } from '../db/models/users.model';
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserModel;
        }
    }
}

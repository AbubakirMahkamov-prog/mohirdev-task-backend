import mongoose from "mongoose";
import db from "../index";

const userModel = new mongoose.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        index: true,
    },
    password: {
        type: String,
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
})

export default db.model('users', userModel);
import type { Express } from "express";
import express from 'express';
import cors from 'cors'
//routers import start
import UserRouter from '../routes/user.route'
import AuthRouter from '../routes/auth.route'
import TaskRouter from '../routes/task.route'
//routers import end


export default async function (app: Express) {
    
    app.use(express.json())
    app.use(cors())
    app.use('/user', UserRouter);
    app.use('/auth', AuthRouter)
    app.use('/task', TaskRouter)
}
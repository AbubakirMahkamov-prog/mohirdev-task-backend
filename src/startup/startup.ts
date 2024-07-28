import type { Express } from "express";
import express from 'express';

//routers import start
import UserRouter from '../routes/user.route'
import AuthRouter from '../routes/auth.route'
//routers import end


export default async function (app: Express) {
    
    app.use(express.json())
    app.use('/user', UserRouter);
    app.use('/auth', AuthRouter)

}
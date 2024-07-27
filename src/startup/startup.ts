import type { Express } from "express";
import express from 'express';

export default async function (app: Express) {
    
    app.use(express.json())
    app.use((req, res) => {
        res.send("ok")
    })
}
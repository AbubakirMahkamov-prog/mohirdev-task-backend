import mongoose from "mongoose";
import config from "../config/config";

const db = mongoose.createConnection(config.DB_CONNECTION_STRING)

db.once('open', () => {
    console.log("Connection established!")
})

export default db;
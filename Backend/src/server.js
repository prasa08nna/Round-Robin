import 'dotenv/config'
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./db/index.db.js";
import app from './app.js'

const port=process.env.PORT||8000
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started at the port ${port} successfully`);

        })
    })
    .catch(error => {
        console.log("Error occored while connecting with MongoDB");

    })
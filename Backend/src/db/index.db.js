import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async () => {
    try {
        const connectedInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log("MongoDb connected Successfully with the host:", connectedInstance.connection.host);

    } catch (error) {
        console.log("MongoDB connection failed")
    }
}

export { connectDB }
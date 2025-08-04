import mongoose from "mongoose";
import { MONGO_URL, NODE_ENV } from "./config.js";

export const connectDb=async()=>{
    try {
        await mongoose.connect(MONGO_URL);
        console.log(`db connect successfuly in ${NODE_ENV} enviroment`)
    } catch (error) {
        throw new Error("Error in connecting to the database", error.message)
    }
}
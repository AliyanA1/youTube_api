import express from "express";
import { PORT } from "./config/config.js";
import { connectDb } from "./config/db.config.js";

const app=express();

app.get("/",(req,res)=>{
    res.send("hey from server")
});

app.listen(PORT , async()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
    await connectDb()
})
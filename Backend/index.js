// imorts
import express from "express";
import { PORT } from "./config/config.js";
import { connectDb } from "./config/db.config.js";
import cookieParser from "cookie-parser";

 
//local imports
import userRoute from "./Routes/user.Route.js";
import videoRoute from "./Routes/video.Route.js";
import commentRoute from "./Routes/comment.Route.js";

const app=express();

//middlewares
app.use(express.json())
app.use(cookieParser())

//Routes
app.get("/",(req,res)=>{
    res.send("hey this is youtube api")
});
app.use('/api/user',userRoute);
app.use('/api/videos', videoRoute);
app.use('/api/comments', commentRoute)

app.listen(PORT , async()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
    await connectDb()
})
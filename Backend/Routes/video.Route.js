import express from "express";
import { getAllVideos, uploadVideo } from "../Controllers/video.controller.js";
import { userMiddleware } from "../middlewares/user.middleware.js";

const videoRoute=express.Router();
videoRoute.use(userMiddleware)

videoRoute.post('/upload-video',uploadVideo);

videoRoute.get('/get-videos',getAllVideos);

videoRoute.get('/get-video/:id',(req,res)=> res.send('route for getting a single video'));

videoRoute.put('/update-video/:id',(req,res)=> res.send('route for updating a video'));

videoRoute.delete('/delete-video/:id',(req,res)=> res.send('route for deleting a video'));



export default videoRoute;
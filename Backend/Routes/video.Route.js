import express from "express";
import { deletVideo, getAllVideos, updateVideo, uploadVideo, userVideos } from "../Controllers/video.controller.js";
import { userMiddleware } from "../middlewares/user.middleware.js";

const videoRoute=express.Router();
videoRoute.use(userMiddleware)

videoRoute.post('/upload-video',uploadVideo);

videoRoute.get('/get-videos',getAllVideos);

videoRoute.get('/get-videos/:id',userVideos);

videoRoute.put('/update-video/:id',updateVideo);

videoRoute.delete('/delete-video/:id',deletVideo);



export default videoRoute;
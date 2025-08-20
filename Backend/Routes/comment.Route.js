import express from 'express';
import { userMiddleware } from '../middlewares/user.middleware.js';
import { deleteComment, editComment, postComment, videoComments } from '../Controllers/comment.controller.js';


const commentRoute=express.Router();
commentRoute.use(userMiddleware);

commentRoute.post("/post-comment/:videoId",postComment);

commentRoute.get("/get-comment/:videoId", videoComments);

commentRoute.delete("/delete-comment/:commentId",deleteComment);

commentRoute.post("/edit-comment/:commentId",editComment);


export default commentRoute;
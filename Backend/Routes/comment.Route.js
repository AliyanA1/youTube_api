import express from 'express';
import { userMiddleware } from '../middlewares/user.middleware.js';
import { postComment } from '../Controllers/comment.controller.js';


const commentRoute=express.Router();
commentRoute.use(userMiddleware);

commentRoute.post("/post-comment/:videoId",postComment);

commentRoute.post("/get-comment",(req,res)=> res.send('post all comments on the spcific video'));

commentRoute.post("/delete-comment",(req,res)=> res.send('delete a comment'));

commentRoute.post("/edit-comment",(req,res)=> res.send('edit a comment'));


export default commentRoute;
import express from 'express';


const commentRoute=express.Router();

commentRoute.post("/post-comment",(req,res)=> res.send('post a comment'));

commentRoute.post("/get-comment",(req,res)=> res.send('post all comments on the spcific video'));

commentRoute.post("/delete-comment",(req,res)=> res.send('delete a comment'));

commentRoute.post("/edit-comment",(req,res)=> res.send('edit a comment'));


export default commentRoute;
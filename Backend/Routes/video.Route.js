import express from "express";

const videoRoute=express.Router();

videoRoute.post('/upload-video',(req,res)=> res.send('route for video upload'));

videoRoute.get('/get-videos',(req,res)=> res.send('route for getting videos'));

videoRoute.get('/get-video/:id',(req,res)=> res.send('route for getting a single video'));

videoRoute.put('/update-video/:id',(req,res)=> res.send('route for updating a video'));

videoRoute.delete('/delete-video/:id',(req,res)=> res.send('route for deleting a video'));



export default videoRoute;
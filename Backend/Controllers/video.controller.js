import videoModel from "../models/video.model.js";


export const uploadVideo=async(req ,res)=>{
    try {
        const body=req.body;
       
        const newVideo=await videoModel.create({
            title: body.title,
            userId: req.user.id,
            description: body.description,
            videoUrl: body.videoUrl,
            thumbnailUrl: body.thumbnailUrl, 
            category: body.category,
            tags: body.tags ,
        });
       
        res.status(201).json({
            status: "success",
            message: "Video uploaded successfully",
            data: newVideo
        });
    } catch (error) {
        res.status(400).json({
            status: "faild uploading video",
            error: error.message
        })
    }
}


//getting all the videos

export const getAllVideos=async(req ,res)=>{
    try {
        const allVideos=await videoModel.find();

        if(!allVideos){
            return  res.status(400).json({
            status: "Error in fetching videos",
            error: error.message
           })
        }

         res.status(200).json({
            status: "Success",
            "All videos":allVideos
        })

    } catch (error) {
         res.status(400).json({
            status: "Error in fetching videos",
            error: error.message
        })
    }
}
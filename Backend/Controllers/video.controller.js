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
        const allVideos=await videoModel.find().populate("comments", "comment");

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


// getting user vidoes

export const userVideos=async(req ,res)=>{
    try {
        const UserVideos=await videoModel.find({userId: req.params.id})

           if(!UserVideos){
            return  res.status(400).json({
            status: "Error in fetching videos",
            error: error.message
           })
        }

 
           res.status(200).json({
            status: "Success",
            "user Videos":UserVideos
        })

    } catch (error) {
          res.status(400).json({
            status: "Error in fetching videos",
            error: error.message
        })
    }
}

export const deletVideo=async(req ,res)=>{
    try {
        const UserVideo=await videoModel.findOne({_id: req.params.id , userId: req.user.id})
        if(!UserVideo){
            return  res.status(400).json({
            status: "Error video not exist || you are not the owner",
        })
    } 

        const deleteVideo=await videoModel.findByIdAndDelete(req.params.id)

           if(!deleteVideo){
            return  res.status(400).json({
            status: "Error in deleting video",
            error: error.message
           })
        }

 
           res.status(200).json({
            status: "Success",
            "deleted video":deleteVideo
        })

    } catch (error) {
          res.status(400).json({
            status: "Error in deleting video",
            error: error.message
        })
    }
}

//updating the video

export const updateVideo=async(req ,res)=>{
    try {
        const body=req.body;
        const UserVideo=await videoModel.findOne({_id: req.params.id , userId: req.user.id})
        if(!UserVideo){
            return  res.status(400).json({
            status: "Error video not exist || you are not the owner",
        })
    } 

        const updateVideo=await videoModel.findByIdAndUpdate(req.params.id,{...body}, {new: true,runValidators: true})

           if(!updateVideo){
            return  res.status(400).json({
            status: "Error in deleting video",
            error: error.message
           })
        }

 
           res.status(200).json({
            status: "Success",
            "updated video":updateVideo
        })

    } catch (error) {
          res.status(400).json({
            status: "Error in deleting video",
            error: error.message
        })
    }
}

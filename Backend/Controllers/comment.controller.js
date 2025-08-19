import commentModle from "../models/comment.model.js";
import videoModel from "../models/video.model.js";


//creating comment
export const postComment=async(req ,res)=>{
    try {
        const {comment}=req.body;
        const {videoId}=req.params;
        const userId=req.user.id;

        
        if(!comment){
            return res.send("please add comment")
        }

        const find=await videoModel.findOne({_id: videoId});
         if(!find){
            return  res.status(400).json({
            status: "Error video not exist",
        })
       }

        const addComment=await commentModle.create({
            comment,
            userId,
            videoId
        })


        await videoModel.findByIdAndUpdate(videoId,{
            $push: {comments: addComment._id}
        })

        res.status(201).json({
            status: "success",
            message: "comment posted successfully",
            data: addComment
        })

    } catch (error) {
        res.status(400).json({
            status: "faild in posting comment",
            error: error.message
        })
    }
}
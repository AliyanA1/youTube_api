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

//comments on videot
export const videoComments=async(req ,res)=>{
    try {
        const {videoId}=req.params;

        const find=await videoModel.findOne({_id: videoId}).populate("comments", "comment");
         if(!find){
            return  res.status(400).json({
            status: "Error video not exist",
        })
       }

        res.status(201).json({
            status: "success",
            message: "here is all on the comments on the video",
            data: find
        })

    } catch (error) {
        res.status(400).json({
            status: "faild",
            error: error.message
        })
    }
}

//delete comment
export const deleteComment=async(req ,res)=>{
    try {
        const {commentId}=req.params;
         const userId=req.user.id;

        const find=await commentModle.findByIdAndDelete({_id: commentId, userId});
         if(!find){
            return  res.status(400).json({
            status: "Error video not exist",
        })
       }

        res.status(201).json({
            message: "success comment deleted successfuly", 
            data: find
        })

    } catch (error) {
        res.status(400).json({
            status: "faild in deleting comment",
            error: error.message
        })
    }
}

//edit comment
export const editComment=async(req ,res)=>{
    try {
        const {comment}=req.body;
        const {commentId}=req.params;
         const userId=req.user.id;

        const edit=await commentModle.findByIdAndUpdate({_id: commentId, userId}, {comment}, {new: true});
         if(!edit){
            return  res.status(400).json({
            status: "Error video not exist",
        })
       }

        const find=await videoModel.findOne({_id: edit.videoId}).populate("comments", "comment");

        res.status(201).json({
            message: "comment edit & update successfuly", 
            video: find
        })

    } catch (error) {
        res.status(400).json({
            status: "faild in editing comment",
            error: error.message
        })
    }
}
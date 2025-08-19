import mongoose from "mongoose";

const commentSchema=mongoose.Schema({
  comment:{
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  videoId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "videos",
    required: true
  }
},{timestamp: true});

const commentModle=mongoose.model("comments", commentSchema);

export default commentModle;
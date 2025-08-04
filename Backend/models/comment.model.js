import mongoose from "mongoose";

const commentSchema=mongoose.Schema({
  //here we write the schema of comment model
});

const commentModle=mongoose.model("comments", commentSchema);

export default commentModle;
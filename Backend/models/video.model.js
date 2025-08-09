import mongoose from "mongoose";

const videoSchema=mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    description:{
        type: String,
        trim: true,
    },
    videoUrl:{
        type: String,
        required: true,
        trim: true,
    },
    thumbnailUrl:{
        type: String,
        required: true,
        trim: true,
    },
    views:{
        type: Number,
        default: 0
    },
    likes:{
        type: Number,
        default: 0
    },
    dislikes:{
        type: Number,
        default: 0
    },
    comments:{
        type: Array,
        default: []
    },
    category:{
        type: String,
        trim: true,
    },
    tags:{
        type: Array,
        default: []
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },

},{timestamp: true});

const videoModel=mongoose.model("videos", videoSchema);

export default videoModel;
import mongoose from "mongoose";

//Creating schema for posts
const postSchema = mongoose.Schema({

    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

//Creating model with type of Schema as postSchema
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
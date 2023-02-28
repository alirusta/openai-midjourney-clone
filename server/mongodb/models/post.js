import mongoose from "mongoose";

// create PostSchema:
const Post = new mongoose.Schema({
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    photo: { type: String, required: true },
});

// create model from Schema:
const PostSchema = mongoose.model('Post', Post);

// Schema is used when users create posts ('Create.jsx'):
export default PostSchema;

import mongoose from "mongoose";

//Creating schema for user
const userSchema = mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
});

//Creating model with type of Schema as postSchema
const user = mongoose.model('User', userSchema);

export default user;
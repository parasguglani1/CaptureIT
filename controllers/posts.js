//Controllers contain the handlers of rouutes.
//In short the data (logic) inside the route is mentioned here with a const variable which is passed back to 
//routes so that efficient structure of application is maintained


//Be aware to import the handles with .js at end as node does not support without .js like react do.

//model is imported here cause we need to handle route request for creating Post
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";



//Very Important.

//Res . json is used to send json data to the front End so that it could render and display the jSON DATA

export const getPosts = async (req, res) => {
    try {
        //retrive all the posts on get request
        const postMessages = await PostMessage.find();

        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {

    const { id: _id } = req.params;
    const post = req.body;
    //to check if the given ID is a valid type of ID with 24 char and the specific type
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);

}

export const deletePost = async (req, res) => {

    const { id } = req.params;

    //to check if the given ID is a valid type of ID with 24 char and the specific type
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    await PostMessage.findByIdAndRemove(id);

    res.json({message:'Post deleted Successfully'});

}

export const likePost = async (req, res) => {

    const { id } = req.params;
    //to check if the given ID is a valid type of ID with 24 char and the specific type
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    const post=await PostMessage.findById(id);
    const updatedPost=await PostMessage.findByIdAndUpdate(id,{likeCount:(post.likeCount)+1},{ new: true });
    
    res.json(updatedPost);

}


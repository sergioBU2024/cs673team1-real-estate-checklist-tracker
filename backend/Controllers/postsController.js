import mongoose from 'mongoose';
import Post from '../models/PostModel.js';

/**********************************************Get All Posts *********************************************/
const getPosts = async (req, res) => {
    try{
        const posts = await Post.find({ createdAt: "desc"});
        res.status(200).json(posts);
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

/**********************************************Create New Post *******************************************/
const addPost = async (req, res) => {

    //Grab Data from the Request Body
    const {title, body} = req.body;
    
    //Check the fields are not empty
    if(!title || !body){
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try{
        const post = await Post.create({title, body});
        res.status(200).json({ success: 'Post Created.', post });
    }
    catch(error){
        console.log(err);
        res.status(500).json({ error: error.message });
    }
    
}

/**********************************************Create New Post *******************************************/
const deletePost = async (req, res) => {

    //Check if the ID is Valid
    if(!mongoose, Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({ error: 'Invalid ID' });
    }

    //Check if the Post Exists
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(404).json({ error: 'Post Not Found' });
    }

    try{
        await post.remove();
        res.status(200).json({ success: 'Post Deleted' });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

/**********************************************Update Post *******************************************/
const updatePost = async (req, res) => {

    //Grab Data from the Request Body
    const {title, body} = req.body;

    //Check the fields are not empty
    if(!title || !body){
        return res.status(400).json({ msg: 'All fields are required' });
    }

    //Check if the ID is Valid
    if(!mongoose, Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({ error: 'Invalid ID' });
    }

    //Check if the Post Exists
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(404).json({ error: 'Post Not Found' });
    }

    try{
        await post.updateOne({title, body})
        res.status(200).json({ success: 'Post Updated' });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

export {getPosts, addPost, deletePost, updatePost};
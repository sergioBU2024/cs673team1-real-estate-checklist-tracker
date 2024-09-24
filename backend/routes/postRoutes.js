import express from 'express';
import { addPost, getPosts, deletePost, updatePost } from '../Controllers/PostsController.js';

const router = express.Router();


//Get All Posts Route
router.get('/', getPosts);

//Add a new Post Route
router.post('/', addPost);

//Delete a Post Route
router.delete('/:id', deletePost);

//Uodate a Post Route
router.put('/:id', updatePost);

export {router as postRoutes};
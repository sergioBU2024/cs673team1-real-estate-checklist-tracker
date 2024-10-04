import express from 'express';
import { addPost, getPosts, deletePost, updatePost } from '../Controllers/PostsController.js';
import auth from '../Middlewares/auth.js';

const router = express.Router();


//Get All Posts Route
router.get('/', getPosts);

//Add a new Post Route
router.post('/', auth, addPost);

//Delete a Post Route
router.delete('/:id', auth, deletePost);

//Uodate a Post Route
router.put('/:id', auth, updatePost);

export {router as postRoutes};
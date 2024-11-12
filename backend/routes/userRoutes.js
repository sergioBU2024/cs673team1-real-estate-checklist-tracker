import express from 'express';
import { registerUser, loginUser, getUserInfo, updateUserInfo } from '../Controllers/usersController.js';
import auth from '../Middlewares/auth.js';

const router = express.Router();

//Register a new User Route
router.post('/', registerUser);

//login a User Route
router.post('/login', loginUser);

//Get user info Route
router.get('/info',auth, getUserInfo);

//Update user info Route
router.put('/info',auth, updateUserInfo);

export {router as userRoutes}; 
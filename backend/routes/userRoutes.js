import express from 'express';
import { registerUser, loginUser, getUserInfo, updateUserInfo, sendInvitationEmail } from '../Controllers/usersController.js';
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

//Send Invitation Email Route
router.post('/invite',auth, sendInvitationEmail);



export {router as userRoutes}; 
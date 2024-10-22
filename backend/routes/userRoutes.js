import express from 'express';
import { registerUser, loginUser } from '../Controllers/usersController.js';

const router = express.Router();

//Register a new User Route
router.post('/', registerUser);

//login a User Route
router.post('/login', loginUser);

export {router as userRoutes}; 
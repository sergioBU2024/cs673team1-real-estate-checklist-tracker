import express from 'express';
import { addApplication, getApplications, deleteApplication, updateApplication } from '../Controllers/leaseApplicationController.js';
import auth from '../Middlewares/auth.js';

const router = express.Router();


//Get All Applications for specific user Route
router.get('/', getApplications);

//Add a new Application Route
router.post('/', auth, addApplication);

//Delete an Application Route
router.delete('/:id', auth, deleteApplication);

//Update an Application Route
router.put('/:id', auth, updateApplication);

export {router as leaseApplicationRoutes};
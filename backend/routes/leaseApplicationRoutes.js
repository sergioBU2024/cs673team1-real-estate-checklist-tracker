import express from 'express';
import { addApplication, getApplicationsClient, getApplicationsAgent, getApplicationDetails, deleteApplication, updateApplication } from '../Controllers/leaseApplicationController.js';
import auth from '../Middlewares/auth.js';

const router = express.Router();


//Get All Applications for specific client Route
router.get('/client', auth, getApplicationsClient);

//Get All Applications for specific agent Route
router.get('/agent', auth, getApplicationsAgent);

//Get Application Details Route
router.get('/:id', auth, getApplicationDetails);

//Add a new Application Route
router.post('/', auth, addApplication);

//Delete an Application Route
router.delete('/:id', auth, deleteApplication);

//Update an Application Route
router.put('/:id', auth, updateApplication);

export {router as leaseApplicationRoutes};
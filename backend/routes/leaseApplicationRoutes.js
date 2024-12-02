import express from 'express';
import { addApplication, getApplicationsClient, getApplicationsAgent, getApplicationDetails, deleteApplication, updateApplication, addUserToApplication } from '../Controllers/leaseApplicationController.js';
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

// Add user to application (more specific route)
router.put('/addUser/:clientId/:applicationId', auth, addUserToApplication);

// Update an application (generic route)
router.put('update/:id', auth, updateApplication);

export {router as leaseApplicationRoutes};
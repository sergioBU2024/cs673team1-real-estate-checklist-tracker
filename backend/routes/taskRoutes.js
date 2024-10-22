/* Routes for assigning a task
to clients and viewing tasks*/
import express from 'express';
import { assignTask, getTasksClient, uploadDocument } from '../Controllers/taskController.js';

import auth from '../Middlewares/auth.js';

const router = express.Router();

// Route for assigning a task to a client
router.post('/assign', auth, assignTask);

// Route for getting all tasks assigned to a specific client
router.get('/client/:clientId', getTasksClient);

router.post('/upload', uploadDocument);

export {router as taskroutes};
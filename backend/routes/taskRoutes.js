/* Routes for assigning a task
to clients and viewing tasks*/
import express from 'express';
import { assignTask, getApplicationTasks, getTasksClient, uploadDocument, getTaskDetails, getFile, submitTask, approveTask, sendBackTask } from '../Controllers/taskController.js';

import auth from '../Middlewares/auth.js';

const router = express.Router();


router.get('/:taskId/details', auth, getTaskDetails);
// Route for assigning a task to a client
router.post('/assign', auth, assignTask);

// Route for getting all tasks assigned to a specific client
router.get('/:clientId/:applicationId', auth, getTasksClient);

router.post('/file', auth, getFile);

router.post('/submit', auth, submitTask);

router.post('/approve', auth, approveTask);

router.post('/sendBack', auth, sendBackTask);

router.get('/:applicationId', auth, getApplicationTasks);

router.post('/upload', auth, uploadDocument);



export {router as taskroutes};
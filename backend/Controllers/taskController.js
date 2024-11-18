import mongoose from 'mongoose';
import Task from '../models/TaskModel.js';
import User from '../models/UserModel.js';
import LeaseApplication from '../models/LeaseApplicationModel.js';
import multer from 'multer';
import { S3Client } from "@aws-sdk/client-s3"
import multerS3 from 'multer-s3';
import path from 'path';
import 'dotenv/config.js';

// AWS S3 Config
const s3Client = new S3Client({
    region: process.env.S3_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
});

const upload = (bucketName) => {
    return multer({
        storage: multerS3({
            s3: s3Client,
            bucket: bucketName,
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
            }
        })
    });
};

const uploadDocument = async (req, res) => {
    console.log(process.env.S3_BUCKET_NAME);
    const uploadSingle = upload(process.env.S3_BUCKET_NAME).single('file-upload');

    uploadSingle(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const taskId = req.body.taskId; // Assuming you're sending taskId in the request body

        if (!taskId) {
            return res.status(400).json({ error: 'Task ID is required' });
        }

        try {
            // Find the existing task
            const task = await Task.findById(taskId);

            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }

            // Update the task with the file URL
            task.fileUrl = req.file.location;
            
            // If you want to update other fields as well, you can do it here
            if (req.body.status) task.status = req.body.status;

            // Save the updated task
            await task.save();

            res.status(200).json({ 
                message: 'File uploaded and task updated successfully',
                task: task
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating task in database' });
        }
    });
};



const assignTask = async (req, res) => {
    const { title, description, type, assigned_to, applicationId } = req.body;

    //Check the fields are not empty
    if(!title || !type || !assigned_to || !applicationId){
        return res.status(400).json({ msg: 'All fields are required' });
    }

    //Check if the ID is Valid
    if(!mongoose.Types.ObjectId.isValid(applicationId)){
        return res.status(400).json({ error: 'Invalid ID' });
    }

    //Check if the Application Exists
    const application = await LeaseApplication.findById(applicationId);
    if(!application){
        return res.status(404).json({ error: 'Application Not Found' });
    }

    console.log(application);

    //Grab the authenticated user from the request body
    const user = await User.findById(req.user._id);

    //Check if the User is the Owner of the Application
    if(!application.agent.equals(user._id)){
        return res.status(401).json({ error: 'Unauthorized' });
    }

    //check if the user is an agent
    if(user.role !== 'Agent'){
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Find the userAssigned by their id
    const userAssigned = await User.findById(assigned_to );
    if (!userAssigned) {
        return res.status(404).json({ msg: 'User not found' });
    }

    //check if the userAssigned is a client
    if(userAssigned.role !== 'Client'){
        return res.status(400).json({ error: 'User must be a client' });
    }

    try{
        // Create a new task object and save to db
        const task = await Task.create({title, description, type, assigned_to, leaseApplication: application._id});
        res.status(200).json({ success: 'Task Created.', task });
    } catch (err) {
        res.status(500).send(err);
    }
}

const getTasksClient = async (req, res) => {
    try {
        const { clientId, applicationId } = req.params;

        // Find tasks assigned to the client within the specified application
        const tasks = await Task.find({ 
            assigned_to: clientId, 
            leaseApplication: applicationId 
        });

        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const getApplicationTasks = async (req, res) => {
    try {
        const { applicationId } = req.params;

        // Find tasks assigned to the client within the specified application
        const tasks = await Task.find({ leaseApplication: applicationId });

        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}


export { assignTask, getTasksClient, getApplicationTasks, uploadDocument};



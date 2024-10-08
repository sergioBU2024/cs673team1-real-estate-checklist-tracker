/* Routes for assigning a task
to clients and viewing tasks*/
import express from 'express';
const Task = require('../models/Task').default;

const router = express.Router();

// Route for assigning a task to a client
router.post('/assign', async (req, res) => {
    const { title, description, type, assigned_to } = req.body;

    try{
        // Create a new task object and save to db
        const task = new Task({ title, description, type, assigned_to});

        await task.save();

        res.json(task);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Route for getting all tasks assigned to a specific client
router.get('/client/:clientId', async (req, res) => {
    try {
        const tasks = await Task.find({ assigned_to: req.params.clientId});

        res.json(tasks);
    } catch (err) {
        res.status(500).send('Server error'); 
    }
});

module.exports = router;
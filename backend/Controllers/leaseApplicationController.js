import mongoose from 'mongoose';
import User from '../models/UserModel.js';
import LeaseApplication from '../models/LeaseApplicationModel.js';
import Task from '../models/TaskModel.js'; // Ensure Task model is imported

/**********************************************Get All Applications of a specific Client  *********************************************/
const getApplicationsClient = async (req, res) => {
    try {
        const applications = await LeaseApplication.find({
            users: { $in: [req.user._id] }
        })
        .populate('agent', 'firstName lastName')  // Populate agent with just firstName and lastName
        .exec();
        
        console.log(applications);
        res.status(200).json(applications);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}


/**********************************************Get All Applications of a specific Client  *********************************************/
const getApplicationsAgent= async (req, res) => {
    try {
        const applications = await LeaseApplication.find({
            agent: { $in: [req.user._id] }
        })
        .populate('agent', 'firstName lastName') 
        .populate('users', 'firstName lastName') // Populate agent with just firstName and lastName
        .exec();
        
        console.log(applications);
        res.status(200).json(applications);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}


/******************************************Get Applications Details ***********************************************/
const getApplicationDetails = async (req, res) => {

    // Check if the ID is Valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        // Check if the Application Exists
        const application = await LeaseApplication.findById(req.params.id)
            .populate('agent', 'firstName lastName')
            .populate('users', 'firstName lastName')
            .exec();

        if (!application) {
            return res.status(404).json({ error: 'Application Not Found' });
        }

        // Fetch tasks for the application
        const tasks = await Task.find({ leaseApplication: application._id });

        // Calculate progress for each user
        const usersWithProgress = await Promise.all(application.users.map(async (user) => {
            const userTasks = tasks.filter(task => task.assigned_to?.toString() === user._id.toString());
            const totalTasks = userTasks.length;
            const completedTasks = userTasks.filter(task => task.status === 'completed').length;
            const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

            return {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                progress,
            };
        }));

        // Return the application details with user progress
        res.status(200).json({
            id: application._id,
            location: application.location,
            agent: application.agent,
            users: usersWithProgress,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};



/**********************************************Create New Application *******************************************/
const addApplication = async (req, res) => {
    const { 
        location, 
        userIds, 
    } = req.body;

    const user = await User.findById(req.user._id);

    if (user.role !== 'Agent') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const application = await LeaseApplication.create({
            agent: user._id,             // The agent who created the application
            location,                    // Full address of the property
            users: userIds,              // Array of userIds for applicants
        });

        res.status(200).json({ success: 'Application Created.', application });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/**********************************************Delete Application *******************************************/
const deleteApplication = async (req, res) => {

    //Check if the ID is Valid
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({ error: 'Invalid ID' });
    }

    //Check if the Application Exists
    const application = await LeaseApplication.findById(req.params.id);
    if(!application){
        return res.status(404).json({ error: 'Application Not Found' });
    }

    console.log(application.users);

    //Check if the User is the Owner of the Application
    const user = await User.findById(req.user._id);
    if(!application.agent.equals(user._id)){
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try{
        await application.deleteOne();
        res.status(200).json({ success: 'Application Deleted' });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

/**********************************************Update Application *******************************************/
const updateApplication = async (req, res) => {

    //Check if the ID is Valid
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({ error: 'Invalid ID' });
    }

    //Grab Data from the Request Body
    const {location, userEmails} = req.body;
    
    //Check the fields are not empty
    if(!location || !userEmails){
        return res.status(400).json({ msg: 'All fields are required' });
    }

    //Check if the Application Exists
    const application = await LeaseApplication.findById(req.params.id);
    if(!application){
        return res.status(404).json({ error: 'Application Not Found' });
    }

    //Check if the User is the Owner of the Application
    const user = await User.findById(req.user._id);
    if(!application.agent.equals(user._id)){
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Find all users by their emails
    const users = await User.find({ email: { $in: userEmails } });
    if (users.length !== userEmails.length) {
        return res.status(404).json({ msg: 'One or more users not found' });
    }

    //check if all users are clients
    const allUsers = users.every(user => user.role === 'Client');
    if(!allUsers){
        return res.status(400).json({ error: 'All users must be clients' });
    }

    // Extract the ObjectIds of the users
    const userIds = users.map(user => user._id);

    try{
        await application.updateOne({user, location, users: userIds})
        res.status(200).json({ success: 'Application Updated' });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}


// add user to application
const addUserToApplication = async (req, res) => {
    console.log('Adding User to Application');
    const { clientId, applicationId } = req.params;

    // Check if the ID is Valid
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        // Check if the Application Exists
        const application = await LeaseApplication.findById(applicationId);
        if (!application) {
            return res.status(404).json({ error: 'Application Not Found' });
        }

        console.log(1);
        // Check if the User is the Owner of the Application
        const user = await User.findById(req.user._id);
        if (!application.agent.equals(user._id)) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        console.log(2);
        // Find the user by id
        const newUser = await User.findById(clientId);
        if (!newUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log(3);

        // Check if the user is a client
        if (newUser.role !== 'Client') {
            return res.status(400).json({ error: 'User must be a client' });
        }

        console.log(4);

        // Check if the user is already in the application
        if (application.users.includes(newUser._id)) {
            return res.status(400).json({ error: 'User already in the application' });
        }

        console.log(5);

        // Add the user to the application
        application.users.push(newUser._id);
        await application.save();

        res.status(200).json({ success: 'User added to the application', user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};



export {getApplicationsClient, getApplicationsAgent, addApplication, deleteApplication, updateApplication, getApplicationDetails, addUserToApplication};
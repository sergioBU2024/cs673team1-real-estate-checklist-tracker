import mongoose from "mongoose";

const LeaseApplicationSchema = new mongoose.Schema({
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    location: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,  // Array of users referenced by ObjectId
        ref: 'User'
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,  // Array of tasks referenced by ObjectId
        ref: 'Task'
    }],

}, { timestamps: true });

const LeaseApplication = mongoose.model('LeaseApplication', LeaseApplicationSchema);

export default LeaseApplication;
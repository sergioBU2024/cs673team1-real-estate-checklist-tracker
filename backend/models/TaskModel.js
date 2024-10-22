import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String},
    type: { type: String, enum: ['file', 'form'], required: true},
    status: { type: String, enum: ['pending', 'completed'], default: 'pending'},
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    leaseApplication: { type: mongoose.Schema.Types.ObjectId, ref: 'LeaseApplication'},
    fileUrl: { type: String }
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

export default Task;
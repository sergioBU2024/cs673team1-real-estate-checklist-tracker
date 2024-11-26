import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String},
    type: { type: String, enum: ['file', 'form'], required: true},
    status: { type: String, enum: ['pending','submitted','completed'], default: 'pending'},
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    leaseApplication: { type: mongoose.Schema.Types.ObjectId, ref: 'LeaseApplication'},
    fileUrl: { type: String },
    fileType:{ type: String },
    comments: { type: String },
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

export default Task;
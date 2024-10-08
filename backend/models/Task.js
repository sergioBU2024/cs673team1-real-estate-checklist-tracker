// This model defines the structure of tasks
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String},
    type: { type: String, enum: ['file', 'form'], required: true},
    status: { type: String, enum: ['pending', 'completed'], default: 'pending'},
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Task', TaskSchema);
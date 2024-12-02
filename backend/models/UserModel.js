import mongoose from 'mongoose';
import Task from './TaskModel.js';

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
    },
    officeLocation:{
        type: String,
    }
}, { timestamps: true });

// Middleware to delete tasks associated with the user
UserSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    try {
        // Delete all tasks assigned to this user
        await Task.deleteMany({ assigned_to: this._id });
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', UserSchema);

export default User;
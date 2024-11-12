import mongoose from 'mongoose';

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
        required: true
    },
    officeLocation:{
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;
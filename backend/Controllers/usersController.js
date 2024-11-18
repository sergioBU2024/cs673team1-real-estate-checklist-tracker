import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

/***************************************** Creating JWT Token *****************************************/
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
}

/*****************************************Register User *****************************************/
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, role, officeLocation, phoneNumber } = req.body;

    if (role === 'Agent' && !officeLocation && !phoneNumber) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    if (!firstName || !lastName || !email || !password || !role) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    const exist = await User.findOne({ email });
    if (exist) {
        return res.status(400).json({ error: 'Email is already taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await User.create({ firstName, lastName, email, password: hashedPassword, role, officeLocation, phoneNumber });
        const token = createToken(user._id);
        res.status(200).json({ userId: user._id, email, token, role: user.role, firstName: user.firstName, lastName: user.lastName });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



/*****************************************Login User *****************************************/
const loginUser = async (req, res) => {
    //Grab Data from the Request Body
    const {email, password} = req.body;

    //Check the fields are not empty
    if(!email || !password){
        return res.status(400).json({ msg: 'All fields are required' });
    }

    //Check if user email already exists
    const user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({ error: 'Incorrect email or password' });
    }

    //Check if the password is incorrect
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        return res.status(400).json({ error: 'Incorrect email or password' });
    }

    try{
        //Create a JWT Token
        const token = createToken(user._id);

        res.status(200).json({id: user._id, email, token, role: user.role, firstName: user.firstName, lastName: user.lastName }); 
    }
    catch(error){
        console.log(err);
        res.status(500).json({ error: error.message });
    }
}

//get user info
const getUserInfo = async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json(user);
}

const getNewUserInfo = async (req, res) => {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    res.json(user);
}


//update user info
/**********************************************Update User Info *******************************************/
const updateUserInfo = async (req, res) => {
    // Get user ID from authenticated user
    const userId = req.user._id;

    // Grab data from the request body
    const { firstName, lastName, officeLocation, phoneNumber, password } = req.body;

    // Check if fields are not empty where required
    if (!firstName || !lastName) {
        return res.status(400).json({ msg: 'First name, last name are required' });
    }

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update fields if provided
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        
        // If user is an agent, check and update office location
        if (user.role === 'Agent') {
            user.officeLocation = officeLocation || user.officeLocation;
            user.phoneNumber = phoneNumber || user.phoneNumber;
        }

        // If a new password is provided, hash it and update
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Save updated user information
        await user.save();

        res.status(200).json({
            msg: 'User information updated successfully',
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                officeLocation: user.officeLocation
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/***************************************** Send Email *****************************************/
const sendInvitationEmail = async (req, res) => {

    // Grab data from the request body
    const { email, firstName, id } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.APP_PASSWORD
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'You\'ve been invited to apply for a lease!',
        text: `Hello ${firstName},\n\nYou have been invited to apply for a lease. Please follow the instructions on our platform to complete your application.\n\nhttp://localhost:3000/signupnew/${id}\n\nBest regards,\nThe Lease Application Team`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: `Email sent to ${email}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {registerUser, loginUser, getUserInfo, getNewUserInfo, updateUserInfo, sendInvitationEmail};
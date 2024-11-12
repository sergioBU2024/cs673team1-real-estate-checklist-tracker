import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config.js';
import jwt from 'jsonwebtoken';

/***************************************** Creating JWT Token *****************************************/
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
}

/*****************************************Register User *****************************************/
const registerUser = async (req, res) => {
    //Grab Data from the Request Body
    const {firstName, lastName, email, password, role, officeLocation, phoneNumber} = req.body;

    
    //if role is agent, check if officeLocation is not empty
    if(role === 'Agent'){
        if(!officeLocation){
            return res.status(400).json({ msg: 'All fields are required' });
        }
    }

    //Check the fields are not empty
    if(!firstName || !lastName || !email || !password || !role || !phoneNumber){
        return res.status(400).json({ msg: 'All fields are required' });
    }


    //Check if user email already exists
    const exist = await User.findOne({ email });
    if(exist){
        return res.status(400).json({ error: 'Email is already taken' });
    }

    //Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try{
        //Register the User
        const user = await User.create({firstName, lastName, email, password: hashedPassword, role, officeLocation, phoneNumber});
        //Create a JWT Token
        const token = createToken(user._id);
        //Send the Token in the Response
        res.status(200).json({ email, token, role: user.role, firstName: user.firstName, lastName: user.lastName }); 
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}


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

        res.status(200).json({ email, token, role: user.role, firstName: user.firstName, lastName: user.lastName }); 
    }
    catch(error){
        console.log(err);
        res.status(500).json({ error: error.message });
    }
}

export {registerUser, loginUser};
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const auth = async (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({ error: 'Authorization Token Not Found' });
    }

    // Grab the Token from headers (take out the 'Bearer ' word)
    const token = authorization.split(" ")[1];
    console.log(token);

    try{
        // Decode and extract the user id from the token
        const {_id} = jwt.verify(token, process.env.SECRET);
        console.log(_id);
        // Save the user in the request object
        req.user = await User.findById(_id).select("_id");
        console.log(req.user);

        next();
    }
    catch(error){
        return res.status(401).json({ error: error.message });
    }
};

export default auth;
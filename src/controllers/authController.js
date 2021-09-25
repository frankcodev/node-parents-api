const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({});

const createToken = (user, expiresIn) =>{
    const secret = process.env.SECRET_KEY;
    const {id} = user;
    return jwt.sign({ id }, secret, {expiresIn});
}

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        let userExists = await User.findOne({email});
        const correctPassword = userExists && await bcryptjs.compare(password, userExists.password);
        if (!userExists || !correctPassword)  
        return res.status(401).json({error: "Invalid email and / or password"});

        const token = createToken(userExists, '1hr');
        return res.status(200).json({ token })

    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
} 

exports.register = async (req, res) => {
    const {email, password} = req.body;
    const newUser = new User({email, password});

    const salt = await bcryptjs.genSalt(10);
    newUser.password = await bcryptjs.hash(password, salt);
    
      try {
        await newUser.save();
        const token = createToken(newUser, '1hr');
        return res.status(200).json({ token })

      } catch (error) {
        res.status(500).json({error: 'Internal server error'});
      }

} 

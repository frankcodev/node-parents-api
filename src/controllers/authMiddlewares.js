const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validationResult } = require('express-validator')
require('dotenv').config({})

exports.checkRegister = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    const {email, password, cpassword} = req.body;
    if(password !== cpassword) {
        return res.status(400).json({ error: 'Password does not match verification'});
    }

   try {
        const user = await User.findOne({email});
        if(user) return res.status(400).json({ error: 'Existing email'});

        next();
   } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
   }
}

exports.checkToken = async (req, res, next) => {
    let token = req.headers["x-app-token"];
    if (!token) return res.status(403).json({ error: "Wrong or unauthenticated user" });

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decoded.id;
  
      const user = await User.findById(req.userId, { password: 0 });
      if (!user) return res.status(404).json({ error: "User not found" });
  
      next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized!" });
    }
  };
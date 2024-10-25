const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/usermodel')
const dotenv = require('dotenv')

dotenv.config();
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            res.status(400).json({ message: "user is already exisited try with another email" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashPassword

        })


        const response = await user.save();
        res.status(200).json({ message: "user is registered", response });


    } catch (error) {
        console.log("error in user registration", error);
        res.status(500).json(error);

    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const existinguser = await User.findOne({ email });

        if (!existinguser) {
            res.status(400).json({ mesage: "user not found" })
        }
        const ispasswordMatch = await bcrypt.compare(password, existinguser.password);

        if (!ispasswordMatch) {
            res.status(401).json({ message: "passowrd not match" });
        }

        const token = jwt.sign({ userId: existinguser._id }, (process.env.SECRET_KEY))

        if (token) {
            return res.status(200).json({ existinguser, token })
        }

        return res.status(400).json({ message: "Failed tp generate password" });





        
    } catch (error) {
        console.log("eror in login", error);
        res.status(500).json({ message: "eror in login", error })

    }
}

module.exports = { register, login }
// Path: backend\Controllers\AuthController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");
const { oauth2client } = require('../config/googleConfig'); // Import config
const { google } = require('googleapis');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists. Please login.', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Password is explicitly required for normal signup
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: "Signup successful", success: true });
    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(403).json({ message: "Email or password is incorrect", success: false });
        }

        // Check if user signed up with Google and doesn't have a password set
        if (!user.password) {
             return res.status(403).json({ message: "Please login with Google", success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ message: "Email or password is incorrect", success: false });
        }

        const token = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken: token,
            email: user.email,
            name: user.name
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

const googleLogin = async (req, res) => {
    try {
        const { code } = req.body;
        
        // 1. Exchange the code for tokens (access_token, id_token)
        const { tokens } = await oauth2client.getToken(code);
        oauth2client.setCredentials(tokens);

        // 2. Get user info from Google using the access token
        const oauth2 = google.oauth2({
            auth: oauth2client,
            version: 'v2'
        });
        
        const userInfo = await oauth2.userinfo.get();
        const { email, name, id: googleId } = userInfo.data;

        // 3. Check if user exists in our DB
        let user = await UserModel.findOne({ email });

        if (!user) {
            // Create new user if they don't exist
            // Note: No password needed here
            user = new UserModel({
                name,
                email,
                googleId,
            });
            await user.save();
        }

        // 4. Generate JWT token for our app
        const token = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            message: "Google Login successful",
            success: true,
            jwtToken: token,
            email: user.email,
            name: user.name
        });

    } catch (err) {
        console.error("Google Login error:", err);
        return res.status(500).json({ message: "Internal server error during Google Login", success: false });
    }
};

module.exports = { signup, login, googleLogin };
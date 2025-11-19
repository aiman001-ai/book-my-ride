// Path: backend\Controllers\AuthController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists, you can login', success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Signup successful', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Wrong email or password', success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Wrong email or password', success: false });
        }
        const jwtToken = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '10m' });
        res.status(200).json({ message: 'Login success', success: true, jwtToken, name: user.name });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
}

module.exports = { signup, login };

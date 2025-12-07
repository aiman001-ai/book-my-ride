// Path: backend\Models\User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // Google login will not have a password initially, so required is false
    password: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    // Optional: Store googleId if you want to link accounts strictly later
    googleId: { type: String, required: false }
});

module.exports = mongoose.model('users', UserSchema);
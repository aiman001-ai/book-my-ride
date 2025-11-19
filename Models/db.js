// Path: backend\Models\db.js
const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN; // Add this in .env

mongoose.connect(mongo_url)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

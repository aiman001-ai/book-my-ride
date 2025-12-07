// Path: backend\Models\Rent.js
const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
 name: { type: String, required: true },
    contact: { type: String, required: true },
    numberOfPassengers: { type: Number, required: true },
    cityPickPoint: { type: String, required: true },
    cityDropPoint: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },

    expireAt: {
      type: Date,
      required: true,
      expires: 7200 
    }

    
  },{ timestamps: true });

module.exports = mongoose.model('Rent', rentSchema);

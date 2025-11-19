// Path: backend\Controllers\RentController.js
const Rent = require('../Models/Rent');



const createRentRequest = async (req, res) => {
  const {
    name,
    contact,
    numberOfPassengers,
    cityPickPoint,
    cityDropPoint,
    date,
    time
  } = req.body;

  if (!name || !contact || !numberOfPassengers ||
      !cityPickPoint || !cityDropPoint || !date || !time) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  const userDateTime = new Date(`${date}T${time}`);

  // Only 2 minutes after user Date-Time
  const expireAt = new Date(userDateTime.getTime() + 2 * 60 * 60 * 1000);

  const rent = new Rent({
    name,
    contact,
    numberOfPassengers,
    cityPickPoint,
    cityDropPoint,
    date,
    time,
    expireAt
  });

  await rent.save();

  res.status(201).json({
    success: true,
    message: 'Rent request submitted successfully'
  });
};


const getAllRentRequests = async (req, res) => {
  const rents = await Rent.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: rents });
};

module.exports = { createRentRequest, getAllRentRequests };

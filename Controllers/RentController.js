// Path: backend\Controllers\RentController.js

const Rent = require('../Models/Rent');

const createRentRequest = async (req, res) => {
    // ... req.body destructuring code (आपका कोड) ...

    if (!name || !contact || !numberOfPassengers ||
        !cityPickPoint || !cityDropPoint || !date || !time) {
        return res.status(400).json({ success: false, message: 'All fields required' });
    }

    try {
        const userDateTime = new Date(`${date}T${time}`);
        
        
          // Define expireAt (2 hours)
  const expireAt = new Date(Date.now() + 2 * 60 * 60 * 1000);


        const rent = new Rent({
            name,
            contact,
            numberOfPassengers,
            cityPickPoint,
            cityDropPoint,
            date,
            time,
            expireAt // अब यह सही वैल्यू के साथ पास हो रहा है
        });

        await rent.save();

        res.status(201).json({
            success: true,
            message: 'Rent request submitted successfully'
        });
    } catch (err) {
        console.error("Rent Creation Critical Failure:", err.message, err); 
        
        if (err.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: err.message });
        }
        
        return res.status(500).json({ success: false, message: "Internal Server Error. Please check backend logs." });
    }
};

// ... getAllRentRequests code ...
module.exports = { createRentRequest, getAllRentRequests };
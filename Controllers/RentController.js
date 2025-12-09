// Path: backend\Controllers\RentController.js

const Rent = require('../Models/Rent');

const createRentRequest = async (req, res) => {
    // ---------------------------
    // 1. Destructure Body
    // ---------------------------
    const {
        name,
        contact,
        numberOfPassengers,
        cityPickPoint,
        cityDropPoint,
        date,
        time
    } = req.body;

    // ---------------------------
    // 2. Validate Required Fields
    ----------------------------
    if (!name || !contact || !numberOfPassengers ||
        !cityPickPoint || !cityDropPoint || !date || !time) {
        return res.status(400).json({
            success: false,
            message: 'All fields required'
        });
    }

    try {
        // ---------------------------
        // 3. Combine Date + Time
        // ---------------------------
        const userDateTime = new Date(`${date}T${time}`);

        // ---------------------------
        // 4. Set Auto-Expire (2 hours)
        // ---------------------------
        const expireAt = new Date(Date.now() + 2 * 60 * 60 * 1000);

        // ---------------------------
        // 5. Create Rent Request
        // ---------------------------
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

        return res.status(201).json({
            success: true,
            message: 'Rent request submitted successfully'
        });

    } catch (err) {
        console.error("Rent Creation Critical Failure:", err);

        if (err.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error. Please check backend logs."
        });
    }
};



// ---------------------------
// GET ALL RENT REQUESTS
// ---------------------------
const getAllRentRequests = async (req, res) => {
    try {
        const data = await Rent.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data });
    } catch (err) {
        console.error("Fetching Rent Requests Error:", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


module.exports = { createRentRequest, getAllRentRequests };

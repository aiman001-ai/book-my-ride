// Path: backend\Controllers\RentController.js

const Rent = require('../Models/Rent');

const createRentRequest = async (req, res) => {
    try {
        const {
            name,
            contact,
            numberOfPassengers,
            cityPickPoint,
            cityDropPoint,
            date,
            time
        } = req.body;

        // VALIDATION
        if (
            !name ||
            !contact ||
            !numberOfPassengers ||
            !cityPickPoint ||
            !cityDropPoint ||
            !date ||
            !time
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            });
        }

        // Expires in 2 hours
        const expireAt = new Date(Date.now() + 2 * 60 * 60 * 1000);

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
            message: "Rent request submitted successfully"
        });

    } catch (err) {
        console.error("Rent Creation Critical Failure:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


// GET ALL
const getAllRentRequests = async (req, res) => {
    try {
        const rents = await Rent.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: rents });
    } catch (err) {
        console.error("Fetch Rent Error:", err);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = { createRentRequest, getAllRentRequests };

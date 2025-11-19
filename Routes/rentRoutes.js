// Path: backend\Routes\rentRoutes.js
const express = require('express');
const router = express.Router();
const { createRentRequest, getAllRentRequests } = require('../Controllers/RentController');

router.post('/create', createRentRequest);
router.get('/all', getAllRentRequests);

module.exports = router;

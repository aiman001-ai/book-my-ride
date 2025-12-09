// Path: backend\index.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./Models/db');

// IMPORT ROUTES
const AuthRouter = require('./Routes/AuthRouter');
const RentRouter = require('./Routes/rentRoutes');    // ✔ Correct

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get('/ping', (req, res) => res.send('PONG'));

// USE ROUTES
app.use('/auth', AuthRouter);
app.use('/rent', RentRouter);                        // ✔ Correct

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

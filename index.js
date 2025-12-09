// Path: backend\index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./Models/db');

const AuthRouter = require('./Routes/AuthRouter');
const RentRouter = require('./Routes/rentRoutes'); // <--- 1. RentRouter इंपोर्ट किया गया

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.get('/ping', (req, res) => res.send('PONG'));
app.use('/auth', AuthRouter);
app.use('/rent', RentRouter); // <--- 2. RentRouter को '/rent' पाथ पर जोड़ा गया

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
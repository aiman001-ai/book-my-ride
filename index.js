// Path: backend\index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
require('./Models/db');

const AuthRouter = require('./Routes/AuthRouter');
const RentRouter = require('./Routes/rentRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

// Ping
app.get('/ping', (req, res) => res.send('PONG'));

// Routes
app.use('/auth', AuthRouter);
app.use('/rent', RentRouter);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

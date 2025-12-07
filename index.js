// Path: backend\index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./Models/db');

const AuthRouter = require('./Routes/AuthRouter');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.get('/ping', (req, res) => res.send('PONG'));
app.use('/auth', AuthRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

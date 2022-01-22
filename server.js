const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: './config.env' });

const app = express();

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB connection successful!'));

const api = require('./src/api');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
=======
const api = require('./src/api');
const path = require('path');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');
const cors = require('cors');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});


app.use(cors());


// ROUTING
app.use(express.json());

app.use('/api/v1', api);

// ERROR HANDLER
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/public/404.html'));
});

app.use((error, req, res, next) => {
    let { statusCode, message } = error;

    statusCode = statusCode ? statusCode : '500';

    res.status(statusCode).json({
        statusCode,
        message,
    });
});

const express = require('express');
const app = express();
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

mongoose.connect(process.env.MONGODB_CONNECT_STRING);

app.use(cors());

app.listen('3000', () => {
    console.log('Running');
});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// ROUTING
app.use(express.json());

app.use('/api/v1', api);

// ERROR HANDLER
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/public/404.html'));
});

app.use((error, req, res, next) => {
    let { statusCode, message } = error;

    statusCode = statusCode ? statusCode : 500;

    res.status(statusCode).json({
        statusCode,
        message,
    });
});

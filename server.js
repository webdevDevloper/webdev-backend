const express = require('express');
const app = express();

const api = require('./src/api');

const path = require('path');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
mongoose
    .connect('mongodb+srv://wds_test:QWmHDJsufge47pYT@cluster0.zvjyj.mongodb.net/test')
    .then(() => console.log('DB connection successfully'));

const cloudinary = require('cloudinary');
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', api);

app.use((req, res) => {
    res.status(404).json({
        statusCode: 404,
        message: 'API not found',
    });
});

app.use((error, req, res, next) => {
    let { statusCode, message } = error;

    statusCode = statusCode ? statusCode : 500;

    res.status(statusCode).json({
        statusCode,
        message,
    });
});

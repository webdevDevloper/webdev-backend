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
});

// ROUTING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

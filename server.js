const express = require('express');
const app = express();

const api = require('./src/api');

const path = require('path');

const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://wds_test:QWmHDJsufge47pYT@cluster0.zvjyj.mongodb.net/test')
    .then(() => console.log('DB connection successfully'));

app.listen('3000', () => {
    console.log('Running');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});
app.use('/api/v1', api);

app.use((req, res) => {
    res.status(404).send('404');
});

app.use((error, req, res, next) => {
    let { statusCode, message } = error;

    statusCode = statusCode ? statusCode : 500;

    res.status(statusCode).json({
        statusCode,
        message,
    });
});

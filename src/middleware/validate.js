const jwt = require('jsonwebtoken');
const { AppError } = require('../common/errors/AppError');
const { promisify } = require('util');
const User = require('../models/userModel');

exports.validate = async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        res.status(401).json({
            statusCode: 401,
            message: 'You are not logged in! Please log in to get access.',
        });
        return;
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        res.status(401).json({
            statusCode: 401,
            message: 'The user belonging to this token does no longer exist.',
        });
        return;
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        res.status(401).json({
            statusCode: 401,
            message: 'User recently changed password! Please log in again.',
        });
        return;
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
};

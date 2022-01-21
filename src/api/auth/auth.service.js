const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

// const signToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN,
//     });
// };

// const createSendToken = (user, req, res) => {
//     const token = signToken(user._id);

//     res.cookie('jwt', token, {
//         expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
//         httpOnly: true,
//         secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
//     });

//     // Remove password from output
//     user.password = undefined;

//     return {
//         msg: 'Success',
//     };
// };

exports.signup = async (body) => {
    try {
        const newUser = await User.create({
            name: body.name,
            email: body.email,
            password: body.password,
            passwordConfirm: body.passwordConfirm,
        });
        // createSendToken(newUser, req, res);
        return {
            status: 'success',
            message: 'Your account has been created',
        };
    } catch (err) {
        throw new AppError(500, error.message);
    }
};

exports.login = async (body) => {
    try {
        const { email, password } = body;
        // 1) Check if email and password exist
        if (!email || !password) {
            throw new AppError('Please provide email and password!', 400);
        }
        // 2) Check if user exists && password is correct
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            throw new AppError(401, 'Incorrect email or password');
        }

        return {
            status: 'success',
            message: 'Your account has logged in',
        };

        // 3) If everything ok, send token to client
        // createSendToken(user, req, res);
    } catch (err) {
        throw new AppError(500, error.message);
    }
};

exports.protect = async (req) => {
    try {
        // 1) Getting token and check of it's there
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            throw new AppError(401, 'You are not logged in! Please log in to get access.');
        }

        // 2) Verification token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            throw new AppError(401, 'The user belonging to this token does no longer exist.');
        }

        // 4) Check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            throw new AppError(401, 'User recently changed password! Please log in again.');
        }

        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
    } catch (err) {
        throw new AppError(500, error.message);
    }
};

exports.restrictTo = (userRole, roles) => {
    // roles ['admin',...] not 'user'
    if (!roles.includes(userRole)) {
        throw new AppError(403, 'You do not have permission to perform this action');
    }
};

exports.forgotPassword = async (req) => {
    // 1) Get user based on POST email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        throw new AppError(404, 'There is no user with email address.');
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 min)',
            message,
        });

        return {
            status: 'success',
            message: 'Token sent to email!',
        };
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        throw new AppError(500, 'There was an error sending the email. Try again later!');
    }
};

exports.resetPassword = async (body, token) => {
    try {
        // 1) Get user based on the token
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });

        // 2) If token has not expired, and there is user, set the new password
        if (!user) {
            throw new AppError(400, 'Token is invalid or has expired');
        }
        user.password = body.password;
        user.passwordConfirm = body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        return { status: 'success', message: 'Your password has been reset' };

        // 3) Update changedPasswordAt property for the user
        // 4) Log the user in, send JWT
        // createSendToken(user, req, res);
    } catch {
        throw new AppError(500, error.message);
    }
};

exports.updatePassword = async (userID, body) => {
    try {
        // 1) Get user from collection
        const user = await User.findById(userID).select('+password');

        // 2) Check if POSTed current password is correct
        if (!(await user.correctPassword(body.passwordCurrent, user.password))) {
            throw new AppError(401, 'Your current password is wrong.');
        }

        // 3) If so, update password
        user.password = body.password;
        user.passwordConfirm = body.passwordConfirm;
        await user.save();

        // 4) Log user in, send JWT
        // createSendToken(user, req, res);
    } catch (err) {
        throw new AppError(500, error.message);
    }
};

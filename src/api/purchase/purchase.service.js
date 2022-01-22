const Order = require('../../models/orderModel');

const User = require('../../models/userModel');

const { AppError } = require('../../common/errors/AppError');

const { promisify } = require('util');
const jwt = require('jsonwebtoken');

module.exports = {
    addItem: async ({ product }, userId) => {
        try {
            await Order.create({
                items: product,
                userId: userId,
            });
            for (let i = 0; i < product.length; i++) User.removeFromCart(product[i].productId);
            return {
                error: false,
                msg: 'Item added successfully',
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    }, // removeFromCart
    getItems: async (userId) => {
        try {
            let order = await Order.find(userId);
            return {
                order,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    getTotal: async (userId) => {
        try {
            let order = await Order.find(userId);
            let total = order.reduce((total, order) => total + order.totalOfOrder());

            return total;
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    protect: async (req) => {
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
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
};

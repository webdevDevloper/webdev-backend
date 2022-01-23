const User = require('../../models/userModel');

const { AppError } = require('../../common/errors/AppError');

module.exports = {
    getItems: async (userId) => {
        try {
            let user = await User.findById(userId);
            return {
                statusCode: 200,
                message: 'Get item successfully',
                data: user.cart.items,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    updateItem: async (body, userId) => {
        try {
            let { productId, newQuantity } = body;
            let user = await User.findById(userId);
            if (newQuantity) {
                user.updateCart(productId, newQuantity);
            } else {
                user.removeFromCart(productId);
            }
            return {
                statusCode: 200,
                message: 'Update item successfully',
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    addItem: async (body, userId) => {
        try {
            let { productId, quantity } = body;
            let user = await User.findById(userId);
            user.updateCart(productId, quantity);
            return {
                statusCode: 200,
                message: 'Add item successfully',
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    getTotal: async (userId) => {
        try {
            let user = await User.findById(userId);
            let total = await user.totalInCart();
            return {
                statusCode: 200,
                message: 'Get total successfully',
                data: total,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
};

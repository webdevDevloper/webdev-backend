const User = require('../../models/userModel');

const { AppError } = require('../../common/errors/AppError');

module.exports = {
    getItems: async (userId) => {
        try {
            let user = await User.findById(userId);
            return {
                cart: user[0].cart.items,
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
                error: false,
                msg: 'Update successfully',
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    addItem: async (body, userId) => {
        try {
            let { productId, newQuantity } = body;
            let user = await User.findById(userId);
            user.updateCart(productId, newQuantity);
            return {
                error: false,
                msg: 'Add successfully',
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    getTotal: async (userId) => {
        try {
            let user = await User.findById(userId);
            let total = user.totalInCart();
            return total;
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
};

const User = require('../../models/userModel');

const Product = require('../../models/productModel');
const { AppError } = require('../../common/errors/AppError');

module.exports = {
    addItem: async (body, userId) => {
        try {
            let { productId, quantity } = body;
            let user = await User.findById(userId);
            user[0].updatePaid(productId, quantity);
            return {
                error: true,
                msg: 'Item added successfully',
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    getItems: async (userId) => {
        try {
            let user = await User.findById(userId);
            return {
                itemsPurchase: user[0].paid.items,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
};

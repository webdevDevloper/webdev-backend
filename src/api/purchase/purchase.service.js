const Order = require('../../models/orderModel');

const { AppError } = require('../../common/errors/AppError');

module.exports = {
    addItem: async ({ product }, userId) => {
        try {
            const newOrder = await Order.create({
                items: product,
                userId: userId,
            });
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
            let order = await Order.find(userId);
            return {
                order,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
};

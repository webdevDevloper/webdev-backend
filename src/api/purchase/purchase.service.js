const Order = require('../../models/orderModel');

const User = require('../../models/userModel');

const { AppError } = require('../../common/errors/AppError');

module.exports = {
    addItem: async ({ product }, userId) => {
        try {
            await Order.create({
                items: product,
                userId: userId,
            });
            const user = await User.findById(userId);
            for (let i = 0; i < product.length; i++) user.removeFromCart(product[i].productId);
            return {
                statusCode: 200,
                message: 'Item added successfully',
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    getItems: async (userId) => {
        try {
            let order = await Order.find({ userId });
            return {
                statusCode: 200,
                message: 'Get item successfully',
                data: order,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    getTotal: async (userId) => {
        try {
            let order = await Order.find({ userId });
            // let total = 0;
            // for (let i = 0; i < order.length; i++) {
            //     const totalOfOrder = await order[i].totalOfOrder();
            //     total += totalOfOrder;
            // }
            let total = await order.reduce(async (total, order) => {
                const totalOfOrder = await order.totalOfOrder();
                return total + totalOfOrder;
            }, 0);
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

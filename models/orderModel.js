const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, 'Order must belong to an Item!'],
            },
        },
        {
            quantity: { type: Number, required: [true, 'Quantity must be at least 1'] },
        },
    ],
    user: {
        name: {
            type: String,
            required: true,
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Order must belong to a User!'],
        },
    },

    price: {
        type: Number,
        require: [true, 'Booking must have a price.'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    paid: {
        type: Boolean,
        default: true,
    },
});

orderSchema.pre(/^find/, function (next) {
    this.populate('user').populate({
        path: 'tour',
        select: 'name',
    });
    next();
});

const Order = mongoose.model('Booking', orderSchema);

module.exports = Order;

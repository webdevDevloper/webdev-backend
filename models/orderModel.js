const mongoose = require('mongoose')

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
        require: [true, 'Order must have a price.'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    paid: {
        type: Boolean,
        default: true,
    },
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order

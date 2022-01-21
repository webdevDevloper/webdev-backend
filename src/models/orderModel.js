const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    items: [
        {
            product: { type: Object, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Order', orderSchema);

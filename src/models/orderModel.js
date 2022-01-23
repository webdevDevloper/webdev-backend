const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: { type: Number, required: true },
        },
    ],
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
});

orderSchema.methods.totalOfOrder = async function () {
    const order = await this.populate('items.productId', 'price');
    const items = order.items;
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].productId.price;
    }
    console.log(total);
    return total;
};
module.exports = mongoose.model('Order', orderSchema);

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    items: {
        type: [Object],
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    orderAddress: {
        type: String,
        required: true,
    },
    image: {
        type: [String],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    orderNumber: {
        type: Number,
        required: false,
    },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;

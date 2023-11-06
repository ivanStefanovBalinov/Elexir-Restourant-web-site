const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    currency: {
        type: String,
    },
    unit_amount: {
        type: Number,
    },
    images: {
        type: Object,
        required: false,
    },
    object: {
        type: String,
        required: false,
    },
    active: {
        type: Boolean,
        required: false,
    },
    created: {
        type: Number,
        required: false,
    },
    livemode: {
        type: Boolean,
        required: false,
    },
    metadata: {
        type: Array,
        required: false,
    },

    package_dimensions: {
        type: Object,
        required: false,
    },
    shippable: {
        type: Boolean,
        required: false,
    },
    statement_descriptor: {
        type: String,
        required: false,
    },
    tax_code: {
        type: String,
        required: false,
    },
    unit_label: {
        type: String,
        required: false,
    },
    updated: {
        type: Number,
        required: false,
    },
    url: {
        type: String,
        required: false,
    },
});

const Products = mongoose.model('Products', ProductsSchema);
module.exports = Products;

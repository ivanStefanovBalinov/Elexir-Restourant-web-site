const Products = require('../models/StripeProducts-Schema/Products.model');
const stripe = require('stripe')(
    'sk_test_51NXLJkLNq3rgLohdwcnfISvDKujXyj2Zklh2454F2OfLF5N5GZ8ew02yid3bKf6KcvS4yoIsGwywoWAxWfiaVAaE00yOgBobZu',
);
const { StatusCodes } = require('http-status-codes');

//Adding a product to stripe
const addProduct = async (req, res) => {
    const { name, currency, unit_amount, description, images } = req.body;

    const mongoProduct = await Products.create(req.body);

    const stripeProduct = await stripe.products.create({
        id: mongoProduct.id,
        name: name,
        description: description,
        images: images,
        default_price_data: {
            currency: currency,
            unit_amount: unit_amount,
        },
    });

    if (!stripeProduct) {
        throw new BadRequestError('Please follow the model structure.');
    } else {
        res.status(StatusCodes.CREATED).json({ stripeProduct });
    }
};

const getProuct = async (req, res) => {
    const {
        params: { id: productId },
    } = req;

    const product = await stripe.products.retrieve(productId);

    if (!product) {
        throw new BadRequestError('Please follow the model structure.');
    } else {
        res.status(StatusCodes.CREATED).json({ product });
    }
};

const updateProduct = async (req, res) => {
    const {
        params: { id: productId },
    } = req;

    const product = await stripe.products.update(productId, req.body);

    if (!product) {
        throw new BadRequestError('Please follow the model structure.');
    } else {
        res.status(StatusCodes.CREATED).json({ product });
    }
};

const getAllProducts = async (req, res) => {
    const products = await stripe.products.list({
        active: true,
    });

    if (!products) {
        throw new BadRequestError('Please follow the model structure.');
    } else {
        res.status(StatusCodes.CREATED).json({ products });
    }
};

const deleteProduct = async (req, res) => {
    const {
        params: { id: productId },
    } = req;

    const product = await stripe.products.del(productId);

    if (!product) {
        throw new BadRequestError('Please follow the model structure.');
    } else {
        res.status(StatusCodes.CREATED).json({ product });
    }
};

const getAllPrices = async (req, res) => {
    const prices = await stripe.prices.list({});

    if (!prices) {
        throw new BadRequestError('Please follow the model structure.');
    } else {
        res.status(StatusCodes.CREATED).json({ prices });
    }
};

module.exports = {
    addProduct,
    getProuct,
    updateProduct,
    getAllProducts,
    deleteProduct,
    getAllPrices,
};

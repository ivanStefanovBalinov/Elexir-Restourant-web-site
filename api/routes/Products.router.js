const express = require('express');
const router = express.Router();
const Products = require('../models/StripeProducts-Schema/Products.model');
const {
    addProduct,
    getProduct,
    updateProduct,
    getAllProducts,
    deleteProduct,
    getAllPrices,
} = require('../controllers/Products.controller');

router.post('/addProduct', addProduct);
router.post('/updateProduct/:id', updateProduct);
router.get('/all', getAllProducts);
router.get('/all/:id', getProduct);
router.delete('/all/delete/:id', deleteProduct);
router.get('/prices', getAllPrices);

module.exports = router;

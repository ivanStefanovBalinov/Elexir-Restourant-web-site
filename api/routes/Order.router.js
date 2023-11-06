const express = require('express');
const router = express.Router();
const {
    getAllOrders,
    addOrder,
    deleteAllOrders,
    deleteLatestOrder,
} = require('../controllers/Order.controller');

router.get('/', getAllOrders);
router.post('/addOrder', addOrder);
router.delete('/', deleteAllOrders);
router.delete('/deleteLatest', deleteLatestOrder);

module.exports = router;

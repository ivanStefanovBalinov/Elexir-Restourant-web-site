const Order = require('../models/Order-Schema/Order.model');

//Getting all orders
const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find({});
        res.status(200).json(allOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Adding an order
const addOrder = async (req, res) => {
    let ordersToAdd = req.body;

    if (!Array.isArray(ordersToAdd)) {
        ordersToAdd = [ordersToAdd];
    }

    try {
        const newOrders = await Order.create(ordersToAdd);

        if (newOrders.length === 1) {
            res.status(201).json(newOrders[0]);
        } else {
            res.status(201).json(newOrders);
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create orders',
            error: error.message,
        });
    }
};

//Delete all orders
const deleteAllOrders = async (req, res) => {
    try {
        const result = await Order.deleteMany();

        if (result.deletedCount > 0) {
            res.status(200).json({
                message: 'All orders deleted successfully',
            });
        } else {
            res.status(404).json({ message: 'No orders found to delete' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete latest order
const deleteLatestOrder = async (req, res) => {
    try {
        const latestOrder = await Order.findOne().sort({ date: -1 });

        if (!latestOrder) {
            return res
                .status(404)
                .json({ message: 'No orders found to delete' });
        }

        await Order.deleteOne({ _id: latestOrder._id });

        res.status(200).json({ message: 'Latest order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllOrders,
    addOrder,
    deleteAllOrders,
    deleteLatestOrder,
};

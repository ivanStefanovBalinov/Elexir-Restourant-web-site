const express = require('express');
const {
    getAllTables,
    updateTableReservation,
    addTable,
} = require('../controllers/Table.controller');
const router = express.Router();

router.get('/allTables', getAllTables);
router.patch('/updateTable', updateTableReservation);
router.post('/addTable', addTable);

module.exports = router;

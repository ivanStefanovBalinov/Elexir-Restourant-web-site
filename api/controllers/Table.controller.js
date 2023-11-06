const Table = require('../models/Tables-Schema/Table.model');
const { StatusCodes } = require('http-status-codes');

//Add Table
const addTable = async (req, res) => {
    try {
        const newTable = await Table.create(req.body);
        if (!newTable) {
            res.status(StatusCodes.EXPECTATION_FAILED).send(
                'Adding new table is failed!',
            );
        }
        res.status(StatusCodes.CREATED).json({ newTable });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error });
    }
};

//Get All Tables
const getAllTables = async (req, res) => {
    try {
        const allTables = await Table.find({});
        res.status(200).json(allTables);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

//Update Reservation Status
const updateTableReservation = async (req, res) => {
    try {
        const { id, isReserved, reservationHour } = req.body;
        const table = await Table.findOneAndUpdate(
            { tableNumber: id },
            {
                isReserved: isReserved,
                reservationHour: reservationHour,
            },
        );
        setTimeout(async () => {
            const refreshTable = await Table.findOneAndUpdate(
                { tableNumber: id },
                {
                    isReserved: false,
                    reservationHour: '',
                },
            );
        }, 60000);
        if (!table) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send({ message: 'Table not found!' });
        }
        res.status(StatusCodes.OK).json({ table });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error });
    }
};

module.exports = { getAllTables, updateTableReservation, addTable };

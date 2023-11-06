const { NotFoundError } = require('../errors');
const BadRequestError = require('../errors/bad-request');
const { StatusCodes } = require('http-status-codes');
const Menu = require('../models/Menu-Schema/Menu.model');

//Add Menu Column
const addMenuColumn = async (req, res) => {
    const menuColumn = await Menu.create(req.body);

    if (!menuColumn) {
        throw new BadRequestError('Please follow the model structure.');
    } else {
        res.status(StatusCodes.CREATED).json({ menuColumn });
    }
};

//Get All Menu Columns
const getAllMenuColumns = async (req, res) => {
    const allMenuColumns = await Menu.find({});
    if (!allMenuColumns) {
        throw new NotFoundError('Something went wrong. Please try again.');
    } else {
        res.status(StatusCodes.OK).json({ allMenuColumns });
    }
};

//Get Single  Menu Column
const getSingleMenuColumn = async (req, res) => {
    const {
        params: { id: menuColumnId },
    } = req;

    const menuColumn = await Menu.findOne({ _id: menuColumnId });
    if (!menuColumn) {
        throw new NotFoundError(
            `Menu Column with id ${menuColumnId} was not found...`,
        );
    } else {
        res.status(StatusCodes.OK).json({ menuColumn });
    }
};

//Update Menu Column
const updateMenuColumn = async (req, res) => {
    const {
        params: { id: menuColumnId },
    } = req;

    const updatedMenuColumn = await Menu.findByIdAndUpdate(
        { _id: menuColumnId },
        req.body,
        { new: true, runValidators: true },
    );

    if (!updatedMenuColumn) {
        throw new NotFoundError(
            `Menu Column with id ${menuColumnId} was not found...`,
        );
    } else {
        res.status(StatusCodes.OK).json({ updatedMenuColumn });
    }
};

//Delete Menu Column
const deleteMenuColumn = async (req, res) => {
    const {
        params: { id: menuColumnId },
    } = req;

    const menuColumnToDelete = await Menu.findByIdAndDelete({
        _id: menuColumnId,
    });

    if (!menuColumnToDelete) {
        throw new NotFoundError(
            `Menu Column with id ${menuColumnId} was not found...`,
        );
    } else {
        res.status(StatusCodes.OK).send(
            'This menu column was successfully deleted',
        );
    }
};

module.exports = {
    addMenuColumn,
    getAllMenuColumns,
    getSingleMenuColumn,
    updateMenuColumn,
    deleteMenuColumn,
};

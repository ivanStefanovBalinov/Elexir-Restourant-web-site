const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const Reservation = require('../models/Reservation-Schema/Reservation.model');

const makeReservation = async (req, res) => {
    const newReservation = await Reservation.create(req.body);

    if (!newReservation) {
        throw new BadRequestError('Something went wrong. Please try again.');
    } else {
        res.status(StatusCodes.CREATED).json({ newReservation });
    }
};

const getAllReservations = async (req, res) => {
    const reservations = await Reservation.find({});
    if (reservations) {
        res.status(StatusCodes.OK).json(reservations);
    } else {
        res.status(StatusCodes.BAD_REQUEST).send({
            message: 'Something went wrong!',
        });
    }
};

const getAllReservationsPaginated = async (req, res) => {
    const pageSize = 5;

    const allReservation = await Reservation.find({});
    const filteredRes = allReservation.filter(
        (reservation) =>
            new Date().getTime() <
            new Date(reservation.reservationDate).getTime(),
    );
    const totalReservations = filteredRes.length;
    const updatePagesCount = Math.ceil(totalReservations / 5);

    const pageNumber = req.body.page || '1';

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const data = filteredRes.slice(startIndex, endIndex);

    const result = {
        reservations: data,
        total: totalReservations,
        page: pageNumber,
        pages: updatePagesCount,
    };

    res.status(StatusCodes.OK).json(result);
};

const deleteReservation = async (req, res) => {
    const { id } = req.params;
    const deleteTarget = await Reservation.findOneAndDelete({
        _id: id,
    });

    res.status(StatusCodes.OK).json(deleteTarget);
};

module.exports = {
    makeReservation,
    getAllReservationsPaginated,
    deleteReservation,
    getAllReservations,
};

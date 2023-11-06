const BarSpot = require('../models/BarSpot-Schema/BarSpot.model');
const { StatusCodes } = require('http-status-codes');

//Add BarSpot
const addBarSpot = async (req, res) => {
    try {
        const newBarSpot = await BarSpot.create(req.body);
        if (!newBarSpot) {
            res.status(StatusCodes.EXPECTATION_FAILED).send(
                'Adding new bar spot is failed!',
            );
        }
        res.status(StatusCodes.CREATED).json({ newBarSpot });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error });
    }
};

//Get All BarSpots
const getAllBarSpots = async (req, res) => {
    try {
        const allBarSpots = await BarSpot.find({});
        res.status(200).json(allBarSpots);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

//Update Reservation Status
const updateBarSpotReservation = async (req, res) => {
    try {
        const { id, isReserved, reservationHour } = req.body;
        const barSpot = await BarSpot.findOneAndUpdate(
            { id: id },
            {
                isReserved: isReserved,
                reservationHour: reservationHour,
            },
        );
        setTimeout(async () => {
            const refreshBarSpot = await BarSpot.findOneAndUpdate(
                { id: id },
                {
                    isReserved: false,
                    reservationHour: '',
                },
            );
        }, 3600000);
        if (!barSpot) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send({ message: 'Bar spot not found!' });
        }
        res.status(StatusCodes.OK).json({ barSpot });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error });
    }
};

module.exports = { addBarSpot, getAllBarSpots, updateBarSpotReservation };

const mongoose = require('mongoose');

const BarSpotSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    isReserved: {
        type: Boolean,
    },
    reservationHour: {
        type: String,
    },
    smokingStatus: {
        type: String,
    },
    countOfPeople: {
        type: String,
    },
    zone: {
        type: String,
    },
    positionTop: {
        type: String,
    },
    positionLeft: {
        type: String,
    },
    rotation: {
        type: String,
    },
    numberRotation: {
        type: String,
    },
});

const BarSpot = mongoose.model('BarSpot', BarSpotSchema);
module.exports = BarSpot;

const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
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
    positionRight: {
        type: String,
    },
    positionBottom: {
        type: String,
    },
    positionLeft: {
        type: String,
    },
    tableNumber: {
        type: String,
    },
    tableType: {
        type: String,
    },
    rotation: {
        type: String,
    },
});

const Table = mongoose.model('Table', TableSchema);
module.exports = Table;

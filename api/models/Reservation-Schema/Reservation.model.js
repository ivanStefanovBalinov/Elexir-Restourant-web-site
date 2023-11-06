const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ReservationSchema = mongoose.Schema({
    reservationDate: {
        type: String,
        require: true,
    },
    zone: {
        type: String,
        require: true,
    },
    tableNumberOrBarSpot: {
        type: String,
        require: true,
    },
    hour: {
        type: String,
        require: true,
    },
    smokersOrNonSmokers: {
        type: String,
        require: true,
    },
    numberOfPeople: {
        type: String,
        require: true,
    },
});

ReservationSchema.plugin(mongoosePaginate);

const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;

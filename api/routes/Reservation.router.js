const express = require('express');
const {
    makeReservation,
    deleteReservation,
    getAllReservationsPaginated,
    getAllReservations,
} = require('../controllers/Reservation.controller');

const router = express.Router();

router.route('/').post(makeReservation);
router.post('/getReservations', getAllReservationsPaginated);
router.delete('/delete/:id', deleteReservation);
router.get('/getAll', getAllReservations);

module.exports = router;

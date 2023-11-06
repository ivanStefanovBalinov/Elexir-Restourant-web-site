const express = require('express');
const {
    getAllBarSpots,
    updateBarSpotReservation,
    addBarSpot,
} = require('../controllers/BarSpot.controller');
const router = express.Router();

router.get('/allBarSpots', getAllBarSpots);
router.patch('/updateBarSpot', updateBarSpotReservation);
router.post('/addBarSpot', addBarSpot);

module.exports = router;

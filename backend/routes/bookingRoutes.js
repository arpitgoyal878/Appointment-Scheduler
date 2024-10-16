const express = require('express');
const router = express.Router();
const { addBooking, viewBookingsByCourt, getAllCenters } = require('../controllers/bookingController');

// Route to add a booking
router.post('/add', addBooking);

// Route to view all bookings for a specific court
router.get('/court/:courtId', viewBookingsByCourt);

// Route to view all centers (sports available, courts availability)
router.get('/centers', getAllCenters);

module.exports = router;
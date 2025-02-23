const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

router.get('/', bookingsController.getBookings);
router.post('/', bookingsController.createBooking);

module.exports = router;

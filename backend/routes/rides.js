const express = require('express');
const Ride = require('../models/Ride');
const auth = require('../middleware/auth');
const router = express.Router();

// Book a ride
router.post('/book', auth, async (req, res) => {
  const { pickup, dropoff, rideType } = req.body;
  const fare = Math.floor(Math.random() * 4) + 12;  // Mock fare $12-15
  try {
    const ride = new Ride(req.user.id, pickup, dropoff, rideType, fare);
    ride.save();
    res.status(201).json({ message: 'Ride booked', ride });
  } catch (error) {
    res.status(400).json({ message: 'Error booking ride' });
  }
});

// Get ride history
router.get('/history', auth, async (req, res) => {
  try {
    const userRides = Ride.find({ userId: req.user.id });
    res.json(userRides);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history' });
  }
});

module.exports = router;

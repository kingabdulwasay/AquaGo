const express = require('express');
const Driver = require('../models/Driver');
const router = express.Router();

// Apply to be a driver
router.post('/apply', async (req, res) => {
  const { fullName, carModel, license } = req.body;
  try {
    const driver = new Driver(fullName, carModel, license);
    driver.save();
    res.status(201).json({ message: 'Application submitted' });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting application' });
  }
});

module.exports = router;

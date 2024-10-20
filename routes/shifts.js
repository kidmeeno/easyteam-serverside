const express = require('express');
const Shift = require('../models/Shift');
const verifyToken = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const router = express.Router();

// Create a shift (Admin only)
router.post('/', verifyToken, roleCheck(['admin']), async (req, res) => {
  const shift = new Shift(req.body);
  try {
    const savedShift = await shift.save();
    res.send(savedShift);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all shifts for a specific employee (User-specific)
router.get('/employee/:id', verifyToken, async (req, res) => {
  const shifts = await Shift.find({ employee: req.params.id }).populate('location');
  res.send(shifts);
});

module.exports = router;

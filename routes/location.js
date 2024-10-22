const express = require('express');
const router = express.Router();
const Location = require('../models/Location'); // Assuming the model is stored in /models

// @route   POST /locations
// @desc    Create a new location
// @access  Public (or add authentication middleware if needed)
router.post('/', async (req, res) => {
  try {
    const { name, address } = req.body;

    // Ensure both fields are provided
    if (!name || !address) {
      return res.status(400).json({ message: 'Name and address are required' });
    }

    // Create a new location
    const newLocation = new Location({ name, address });
    const savedLocation = await newLocation.save();

    res.status(201).json(savedLocation); // Return the saved location with status code 201
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /locations
// @desc    Get all locations
// @access  Public (or add authentication middleware if needed)
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find(); // Fetch all locations
    res.status(200).json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /locations/:id
// @desc    Update a location by ID
// @access  Public (or add authentication middleware if needed)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;

    // Find the location by ID and update it
    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { name, address },
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.status(200).json(updatedLocation); // Return the updated location
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

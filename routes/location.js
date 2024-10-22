const express = require('express');
const router = express.Router();
const Location = require('../models/Location'); 

router.post('/', async (req, res) => {
  try {
    const { name, address } = req.body;

    
    if (!name || !address) {
      return res.status(400).json({ message: 'Name and address are required' });
    }
    const newLocation = new Location({ name, address });
    const savedLocation = await newLocation.save();

    res.status(201).json(savedLocation); 
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const locations = await Location.find(); 
    res.status(200).json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;

    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { name, address },
      { new: true, runValidators: true } 
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.status(200).json(updatedLocation); 
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

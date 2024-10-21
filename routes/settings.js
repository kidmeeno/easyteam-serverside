const express = require('express');
const verifyToken = require('../middleware/auth');
const Settings = require('../models/Settings'); // Import the Mongoose model
const router = express.Router();

// Fetch the isGlobalTrackingEnabled value
router.get('/', verifyToken, async (req, res) => {
  try {
    // Find the settings document in the database
    const settings = await Settings.findOne();

    if (settings) {
      // If found, return the value stored in the database
      res.send(settings.isGlobalTrackingEnabled);
    } else {
      // If not found, return `false` as default
      res.send({ isGlobalTrackingEnabled: false });
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).send('An error occurred while fetching settings');
  }
});

// Update the isGlobalTrackingEnabled value
router.put('/', async (req, res) => {
  try {
    const { isGlobalTrackingEnabled } = req.body;

    // Check if the settings document exists
    let settings = await Settings.findOne();

    if (settings) {
      // Update the existing settings document
      settings.isGlobalTrackingEnabled = isGlobalTrackingEnabled;
      await settings.save();
    } else {
      // Create a new settings document if it doesn't exist
      settings = new Settings({
        isGlobalTrackingEnabled,
      });
      await settings.save();
    }

    // Return the updated settings
    res.send(settings.isGlobalTrackingEnabled);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).send('An error occurred while updating settings');
  }
});

module.exports = router;

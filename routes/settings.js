const express = require('express');
const verifyToken = require('../middleware/auth');
const Settings = require('../models/Settings'); 
const router = express.Router();


router.get('/', verifyToken, async (req, res) => {
  try {
    const settings = await Settings.findOne();

    if (settings) {
      res.send(settings.isGlobalTrackingEnabled);
    } else {
      res.send({ isGlobalTrackingEnabled: false });
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).send('An error occurred while fetching settings');
  }
});

router.put('/', async (req, res) => {
  try {
    const { isGlobalTrackingEnabled } = req.body;

    let settings = await Settings.findOne();

    if (settings) {
      settings.isGlobalTrackingEnabled = isGlobalTrackingEnabled;
      await settings.save();
    } else {
      settings = new Settings({
        isGlobalTrackingEnabled,
      });
      await settings.save();
    }

    res.send(settings.isGlobalTrackingEnabled);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).send('An error occurred while updating settings');
  }
});

module.exports = router;

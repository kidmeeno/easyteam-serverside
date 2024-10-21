const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  isGlobalTrackingEnabled: {
    type: Boolean,
    default: true,  // Set default value to true
  },
});

module.exports = mongoose.model('Settings', SettingsSchema);

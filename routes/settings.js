const express = require('express');
const verifyToken = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const router = express.Router();

let globalTimeTrackingSettings = {
  timeFormat: '24-hour',  // Example setting
};

router.get('/', verifyToken, (req, res) => {
  res.send(globalTimeTrackingSettings);
});

router.put('/', verifyToken, roleCheck(['admin']), (req, res) => {
  globalTimeTrackingSettings = req.body;
  res.send(globalTimeTrackingSettings);
});

module.exports = router;

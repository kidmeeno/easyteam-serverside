const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
});

module.exports = mongoose.model('Shift', ShiftSchema);

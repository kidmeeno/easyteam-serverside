const mongoose = require('mongoose');

const TimesheetSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  clockIn: { type: Date, required: true },
  clockOut: { type: Date },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Timesheet', TimesheetSchema);

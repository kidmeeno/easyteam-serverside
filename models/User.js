const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/ // Basic email regex validation
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  notifications: { type: Boolean, default: true },  // Notification settings
});

module.exports = mongoose.model('User', UserSchema);

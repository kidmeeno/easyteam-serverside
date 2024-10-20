const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const authRoute = require('./routes/auth');
const employeeRoute = require('./routes/employees');
const shiftRoute = require('./routes/shifts');
const settingsRoute = require('./routes/settings');

// Connect to DB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error("Could not connect to MongoDB", err));
;

// Route Middleware
app.use('/api/auth', authRoute);
app.use('/api/employees', employeeRoute);
app.use('/api/shifts', shiftRoute);
app.use('/api/settings', settingsRoute);
// Start server

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



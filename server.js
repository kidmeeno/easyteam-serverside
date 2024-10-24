const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const employeeRoute = require("./routes/employees");
const settingsRoute = require("./routes/settings");
const location = require("./routes/location");

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use("/api/employees", employeeRoute);
app.use("/api/settings", settingsRoute);
app.use("/api/locations", location);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

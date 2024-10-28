const dotenv = require("dotenv");

dotenv.config();

const env = Object.freeze({
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET,
});

module.exports = env;

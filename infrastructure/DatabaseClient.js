const mongoose = require("mongoose");
const Logger = require("./Logger");

class DatabaseClient {
  constructor(uri) {
    this.uri = uri;
  }

  async connect() {
    try {
      await mongoose.connect(this.uri);
      Logger.info("MongoDB connected");
    } catch (err) {
      Logger.error("Could not connect to MongoDB", err);
    }
  }
}

module.exports = DatabaseClient;

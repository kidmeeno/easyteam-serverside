const mongoose = require("mongoose");
const Employee = require("../models/Employee");
const Location = require("../models/Location");
const { v4: uuidv4 } = require("uuid");
const Logger = require("../infrastructure/Logger");
const { MONGO_URI } = require("../infrastructure/environmentalVariables");

mongoose
  .connect(MONGO_URI)
  .then(() => Logger.info("MongoDB Connected for Seeding"))
  .catch((err) => Logger.info(err));

const seedData = async () => {
  try {
    // Create locations
    const location1 = new Location({
      name: "Seatle Us",
      address: "123 Street",
    });
    const location2 = new Location({
      name: "Boston Us",
      address: "456 Avenue",
    });

    await location1.save();
    await location2.save();

    // Create employees with random IDs
    const employee1 = new Employee({
      name: "John Doe",
      employeeID: uuidv4(),
      location: location1._id,
      role: "admin",
    });
    const employee2 = new Employee({
      name: "Jane Smith",
      employeeID: uuidv4(),
      location: location2._id,
    });

    await employee1.save();
    await employee2.save();

    Logger.info("Seed data created");
    mongoose.connection.close();
  } catch (error) {
    Logger.error(error);
    mongoose.connection.close();
  }
};

seedData();

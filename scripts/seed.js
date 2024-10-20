const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('../models/Employee');
const Location = require('../models/Location');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch((err) => console.log(err));

const seedData = async () => {
  try {
    // Create locations
    const location1 = new Location({ name: 'Seatle Us', address: '123 Street' });
    const location2 = new Location({ name: 'Boston Us', address: '456 Avenue' });

    await location1.save();
    await location2.save();

    // Create employees with random IDs
    const employee1 = new Employee({ name: 'John Doe', employeeID: uuidv4(), location: location1._id, role: 'admin' });
    const employee2 = new Employee({ name: 'Jane Smith', employeeID: uuidv4(), location: location2._id });

    await employee1.save();
    await employee2.save();

    console.log('Seed data created');
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};

seedData();

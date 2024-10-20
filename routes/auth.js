const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();
const router = express.Router();

// Register user (Admin only)
router.post("/register", async (req, res) => {
  const { username, password, email, role, location } = req.body;

  // Check if username or email already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).send("Username or email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
    email, // Include email in the user creation
    role,
    location,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("email or password is wrong.");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Invalid password.");

  const payload = {
    employeeId: "56",
    locationId: "6789",
    organizationId: "0812",
    partnerId: "d40e2f92-2523-4833-a9cc-a95cef576876",
    payrollId: "123",
    employerPayrollId: "123",
    accessRole: {
      name: "manager",
      permissions: ["LOCATION_READ", "SHIFT_READ", "SHIFT_WRITE", "SHIFT_ADD"],
    },
    role: {
      name: "admin",
    },
  };
  const privateKeyPath = path.join(__dirname, "../jwtRS256.key");
  const privateKey = fs.readFileSync(privateKeyPath, "utf8");
  const token = jwt.sign(payload, privateKey, { algorithm: "RS256" });
  res.header("auth-token", token).send({ token, payload });
});

module.exports = router;
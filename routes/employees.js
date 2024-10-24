const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");
const verifyToken = require("../middleware/auth");
const Settings = require("../models/Settings");

// CREATE an employee
router.post("/create", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newEmployee = new Employee({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      locationId: req.body.locationId,
      organizationId: req.body.organizationId,
      partnerId: req.body.partnerId,
      payrollId: req.body.payrollId,
      employerPayrollId: req.body.employerPayrollId,
      accessRole: req.body.accessRole,
      role: req.body.role,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json({
      message: "Employee created successfully",
      employee: savedEmployee,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error });
  }
});

router.post("/employee-login", async (req, res) => {
  const { email, password } = req.body;

  const employee = await Employee.findOne({ email });
  const settings = await Settings.findOne();
  const employees = await Employee.find();

  if (!employee) return res.status(400).send("Email or password is wrong.");

  const validPass = await bcrypt.compare(password, employee.password);
  if (!validPass) return res.status(400).send("Invalid password.");

  const employeePayload = employee.toObject();
  const payload = {
    employeeId: employeePayload.employeeId,
    locationId: employeePayload.locationId,
    organizationId: employeePayload.organizationId,
    partnerId: employeePayload.partnerId,
    payrollId: employeePayload.payrollId,
    employerPayrollId: employeePayload.employerPayrollId,
    accessRole: employeePayload.accessRole,
    role: employeePayload.role,
  };

  const formattedEmployees = employees.map((emp) => {
    const plainEmployee = emp.toObject();
    return {
      id: plainEmployee._id,
      payrollId: plainEmployee.payrollId,
      name: plainEmployee.username,
      picture: "https://randomuser.me/api/portraits/men/1.jpg",
    };
  });

  let employeesToReturn;
  if (employee.role.name === "regular") {
    employeesToReturn = [
      {
        id: employee._id,
        payrollId: employee.payrollId,
        name: employee.username,
        picture: "https://randomuser.me/api/portraits/men/1.jpg",
      },
    ];
  } else {
    employeesToReturn = formattedEmployees;
  }

  const privateKeyPath = path.join(__dirname, "../priv.key");
  const privateKey = fs.readFileSync(privateKeyPath, "utf8");
  const token = jwt.sign(payload, privateKey, { algorithm: "RS256" });
  res
    .header("auth-token", token)
    .send({
      token,
      employee: employeePayload,
      employees: employeesToReturn,
      isGlobalTrackingEnabled: settings.isGlobalTrackingEnabled,
    });
});

// GET all employees
router.get("/", verifyToken, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
});

// GET employee by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error });
  }
});

// UPDATE employee by ID
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
});

// DELETE employee by ID
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
});

module.exports = router;

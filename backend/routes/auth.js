const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


/* ===============================
   SIGNUP
================================ */

router.post("/signup", async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Count users to generate employee id
    const userCount = await User.countDocuments();

    // Company employee ID format
    const employeeId = "EMP" + String(userCount + 1).padStart(3, "0");

    const user = new User({
      employeeId,
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.json({
      message: "User registered successfully",
      employeeId: employeeId
    });

  } catch (err) {
    res.status(500).json(err);
  }
});


/* ===============================
   LOGIN
================================ */

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({
  token,
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    employeeId: user.employeeId,
    designation: user.designation
  }
});

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
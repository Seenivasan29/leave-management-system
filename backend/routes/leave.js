const express = require("express");
const router = express.Router();
const Leave = require("../models/Leave");


// Apply Leave
router.post("/apply", async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.json({ message: "Leave applied successfully", leave });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Get All Leaves (Employer dashboard)
router.get("/", async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ Get leaves by employeeId (Employee dashboard)
router.get("/employee/:employeeId", async (req, res) => {
  try {
    const leaves = await Leave.find({
      employeeId: req.params.employeeId
    });

    res.json(leaves);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Approve Leave
router.put("/approve/:id", async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );
    res.json(leave);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Reject Leave
router.put("/reject/:id", async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );
    res.json(leave);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {

    await Leave.findByIdAndDelete(req.params.id)

    res.json({ message: "Leave deleted successfully" })

  } catch (err) {

    res.status(500).json({ error: err.message })

  }
});

module.exports = router;
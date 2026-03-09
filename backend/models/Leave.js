const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({

  employeeId: String,
  employeeName: String,
  leaveType: String,
  startDate: Date,
  endDate: Date,
  reason: String,

  status:{
    type:String,
    default:"Pending"
  }

});

module.exports = mongoose.model("Leave", LeaveSchema);
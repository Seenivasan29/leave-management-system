const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  employeeId: {
    type: String,
    unique: true
  },

  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  role: String

});

module.exports = mongoose.model("User", userSchema);
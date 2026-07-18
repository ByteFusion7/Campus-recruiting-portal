const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  role: { type: String, default: "Admin" }
});

module.exports = mongoose.model("Admin", AdminSchema);

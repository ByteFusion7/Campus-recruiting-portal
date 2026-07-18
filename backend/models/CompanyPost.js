const mongoose = require("mongoose");

const CompanyPostSchema = new mongoose.Schema({
  companyName: String,
  jobTitle: String,
  description: String,
  eligibility: String,
  deadline: Date,
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CompanyPost", CompanyPostSchema);

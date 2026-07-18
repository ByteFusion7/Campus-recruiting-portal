const mongoose = require("mongoose");

const StudentApplicationSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  postId: mongoose.Schema.Types.ObjectId,
  resumeUrl: String,
  coverLetter: String,
  status: { type: String, enum: ["Applied", "Selected", "Rejected"], default: "Applied" },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("StudentApplication", StudentApplicationSchema);

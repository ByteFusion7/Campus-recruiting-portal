const express = require("express");
const router = express.Router();
const StudentApplication = require("../models/StudentApplication");
const CompanyPost = require("../models/CompanyPost");

// Applications per company
router.get("/applications", async (req, res) => {
  const data = await StudentApplication.aggregate([
    { $group: { _id: "$postId", count: { $sum: 1 } } }
  ]);
  res.json(data);
});

// Placement rate
router.get("/placements", async (req, res) => {
  const total = await StudentApplication.countDocuments();
  const selected = await StudentApplication.countDocuments({ status: "Selected" });
  res.json({ placementRate: (selected / total) * 100 });
});

// Approval stats
router.get("/approvals", async (req, res) => {
  const approved = await CompanyPost.countDocuments({ status: "Approved" });
  const rejected = await CompanyPost.countDocuments({ status: "Rejected" });
  res.json({ approved, rejected });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const StudentApplication = require("../models/StudentApplication");

// Apply to a post
router.post("/", async (req, res) => {
  try {
    const application = new StudentApplication(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get applications by student
router.get("/student/:id", async (req, res) => {
  const apps = await StudentApplication.find({ studentId: req.params.id });
  res.json(apps);
});

// Get applications by company post
router.get("/company/:id", async (req, res) => {
  const apps = await StudentApplication.find({ postId: req.params.id });
  res.json(apps);
});

module.exports = router;

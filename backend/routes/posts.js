const express = require("express");
const router = express.Router();
const CompanyPost = require("../models/CompanyPost");

// Create a new post
router.post("/", async (req, res) => {
  try {
    const post = new CompanyPost(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  const posts = await CompanyPost.find();
  res.json(posts);
});

// Approve post
router.put("/:id/approve", async (req, res) => {
  const post = await CompanyPost.findByIdAndUpdate(req.params.id, { status: "Approved" }, { new: true });
  res.json(post);
});

// Reject post
router.put("/:id/reject", async (req, res) => {
  const post = await CompanyPost.findByIdAndUpdate(req.params.id, { status: "Rejected" }, { new: true });
  res.json(post);
});

module.exports = router;

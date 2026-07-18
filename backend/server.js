
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in‑memory storage
let posts = [];
let applications = [];

// ✅ Company Posts
app.post("/posts", (req, res) => {
  const post = { id: posts.length + 1, ...req.body, status: "Pending" };
  posts.push(post);
  res.status(201).json(post);
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.put("/posts/:id/approve", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) post.status = "Approved";
  res.json(post);
});

app.put("/posts/:id/reject", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) post.status = "Rejected";
  res.json(post);
});

// ✅ Student Applications
app.post("/applications", (req, res) => {
  const application = { id: applications.length + 1, ...req.body, status: "Applied" };
  applications.push(application);
  res.status(201).json(application);
});

app.get("/applications", (req, res) => {
  res.json(applications);
});

// ✅ Analytics
app.get("/analytics/applications", (req, res) => {
  res.json({ totalApplications: applications.length });
});

app.get("/analytics/posts", (req, res) => {
  const approved = posts.filter(p => p.status === "Approved").length;
  const rejected = posts.filter(p => p.status === "Rejected").length;
  res.json({ approved, rejected });
});

// ✅ Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

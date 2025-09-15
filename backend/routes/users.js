const express = require("express");
const router = express.Router();
const db = require("../database.js");

// GET all users
router.get("/", (req, res) => {
  const sql = "SELECT * FROM users ORDER BY date_created DESC";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// GET a single user by ID
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  const params = [req.params.id];

  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      message: "success",
      data: row,
    });
  });
});

// POST - Create a new user
router.post("/", (req, res) => {
  const { name, email, phone, address } = req.body;
  const errors = [];

  // Validation
  if (!name) errors.push("Name is required");
  if (!email) errors.push("Email is required");
  if (!phone) errors.push("Phone is required");

  if (errors.length) {
    res.status(400).json({ error: errors.join(", ") });
    return;
  }

  const sql =
    "INSERT INTO users (name, email, phone, address) VALUES (?, ?, ?, ?)";
  const params = [name, email, phone, address || null];

  db.run(sql, params, function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        res.status(400).json({ error: "Email already exists" });
      } else {
        res.status(400).json({ error: err.message });
      }
      return;
    }

    res.json({
      message: "success",
      data: {
        id: this.lastID,
        name,
        email,
        phone,
        address,
      },
    });
  });
});

// PUT - Update an existing user
router.put("/:id", (req, res) => {
  const { name, email, phone, address } = req.body;
  const errors = [];

  // Validation
  if (!name) errors.push("Name is required");
  if (!email) errors.push("Email is required");
  if (!phone) errors.push("Phone is required");

  if (errors.length) {
    res.status(400).json({ error: errors.join(", ") });
    return;
  }

  const sql =
    "UPDATE users SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?";
  const params = [name, email, phone, address || null, req.params.id];

  db.run(sql, params, function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        res.status(400).json({ error: "Email already exists" });
      } else {
        res.status(400).json({ error: err.message });
      }
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      message: "success",
      data: {
        id: req.params.id,
        name,
        email,
        phone,
        address,
      },
    });
  });
});

// DELETE - Remove a user
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  const params = [req.params.id];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      message: "deleted",
      changes: this.changes,
    });
  });
});

module.exports = router;

const express = require("express");
const db = require("../db");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Add sweet
router.post("/", auth, (req, res) => {
  const { name, category, price, quantity } = req.body;
  db.query(
    "INSERT INTO sweets (name, category, price, quantity) VALUES (?,?,?,?)",
    [name, category, price, quantity],
    () => res.json({ message: "Sweet added" })
  );
});

// Get all sweets
router.get("/", auth, (req, res) => {
  db.query("SELECT * FROM sweets", (err, result) => {
    res.json(result);
  });
});

// Search sweets
router.get("/search", auth, (req, res) => {
  const { name, category } = req.query;
  db.query(
    "SELECT * FROM sweets WHERE name LIKE ? OR category LIKE ?",
    [`%${name}%`, `%${category}%`],
    (err, result) => res.json(result)
  );
});

// Update sweet
router.put("/:id", auth, (req, res) => {
  db.query(
    "UPDATE sweets SET ? WHERE id = ?",
    [req.body, req.params.id],
    () => res.json({ message: "Sweet updated" })
  );
});

// Delete sweet (Admin)
router.delete("/:id", auth, admin, (req, res) => {
  db.query(
    "DELETE FROM sweets WHERE id = ?",
    [req.params.id],
    () => res.json({ message: "Sweet deleted" })
  );
});

// Purchase sweet
router.post("/:id/purchase", auth, (req, res) => {
  db.query(
    "UPDATE sweets SET quantity = quantity - 1 WHERE id = ? AND quantity > 0",
    [req.params.id],
    () => res.json({ message: "Sweet purchased" })
  );
});

// Restock sweet (Admin)
router.post("/:id/restock", auth, admin, (req, res) => {
  db.query(
    "UPDATE sweets SET quantity = quantity + 10 WHERE id = ?",
    [req.params.id],
    () => res.json({ message: "Sweet restocked" })
  );
});

module.exports = router;
import express from "express";
import db from "../../config/db.js"; // MySQL connection

const router = express.Router();

// GET all shop orders
router.get("/", (req, res) => {
  const query = "SELECT * FROM shop_orders ORDER BY id DESC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

export default router;
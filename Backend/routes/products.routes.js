import express from "express";
import db from "../config/db.js";

const router = express.Router();

/* ============ GET PRODUCTS ============ */
router.get("/", (req, res) => {
  const { category, minPrice, maxPrice } = req.query;

  let sql = "SELECT * FROM products WHERE 1=1";
  const params = [];

  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }

  if (minPrice) {
    sql += " AND price_per_day >= ?";
    params.push(minPrice);
  }

  if (maxPrice) {
    sql += " AND price_per_day <= ?";
    params.push(maxPrice);
  }

  sql += " ORDER BY id DESC";

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* ============ ADD PRODUCT ============ */
router.post("/", (req, res) => {
  const {
    name,
    category,
    pricePerDay,
    startDate,
    endDate,
    duration,
    deposit,
    total,
  } = req.body;

  const sql = `
    INSERT INTO products
    (name, category, price_per_day, start_date, end_date, duration, deposit, total)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      category,
      pricePerDay,
      startDate,
      endDate,
      duration,
      deposit,
      total,
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    }
  );
});

/* ============ UPDATE PRODUCT ============ */
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const {
    name,
    category,
    pricePerDay,
    startDate,
    endDate,
    duration,
    deposit,
    total,
  } = req.body;

  const sql = `
    UPDATE products SET
    name=?, category=?, price_per_day=?, start_date=?, end_date=?,
    duration=?, deposit=?, total=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      name,
      category,
      pricePerDay,
      startDate,
      endDate,
      duration,
      deposit,
      total,
      id,
    ],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
});

/* ============ DELETE PRODUCT ============ */
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM products WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});

export default router;

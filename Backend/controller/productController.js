import db from "../config/db.js";

export const getProducts = (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;

    let sql = `
      SELECT
        id,
        name,
        category,
        price_per_day AS pricePerDay,
        start_date AS startDate,
        end_date AS endDate,
        duration,
        deposit,
        total,
        created_at
      FROM products
      WHERE 1 = 1
    `;

    const params = [];

    if (category) {
      sql += " AND category = ?";
      params.push(category);
    }

    if (minPrice) {
      sql += " AND price_per_day >= ?";
      params.push(Number(minPrice));
    }

    if (maxPrice) {
      sql += " AND price_per_day <= ?";
      params.push(Number(maxPrice));
    }

    sql += " ORDER BY id DESC";

    db.query(sql, params, (err, rows) => {
      if (err) {
        console.error("MYSQL ERROR ❌", err);
        return res.status(500).json(err);
      }
      res.json(rows);
    });
  } catch (err) {
    console.error("SERVER ERROR ❌", err);
    res.status(500).json(err);
  }
};


import db from "../../config/db.js";

export const getInventoryReport = (req, res) => {

  const query = `
SELECT
  p.id AS product_id,
  p.code,
  p.name AS product_name,
  c.category_name,
  p.subcategory_id,
  p.size,
  p.color,

  IFNULL(p.stock,0) AS stock,
  p.min_stock,

  p.mrp,
  p.rent_price,
  p.deposit_price,

  COUNT(sc.id) AS times_rented,
  MAX(sc.created_at) AS last_rented

FROM shop_product p

LEFT JOIN category c
ON p.subcategory_id = c.id

LEFT JOIN shop_checkout_new sc
ON p.id = sc.product_id

GROUP BY
  p.id,
  p.code,
  p.name,
  c.category_name,
  p.subcategory_id,
  p.size,
  p.color,
  p.stock,
  p.min_stock,
  p.mrp,
  p.rent_price,
  p.deposit_price

ORDER BY p.name ASC;
`;

  db.query(query, (err, results) => {

    if (err) {
      console.error("Error fetching inventory:", err);
      return res.status(500).json(err);
    }

    res.json(results);

  });
};

// import db from "../../config/db.js";

// export const getInventoryReport = (req, res) => {

//   const query = `
// SELECT
//   p.id AS product_id,
//   p.code,
//   p.name AS product_name,
//   c.category_name,
//   p.subcategory_id,
//   p.size,
//   p.color,

//   IFNULL(p.stock,0) AS total_stock,
//   p.min_stock,

//   COUNT(sc.id) 
//   - COUNT(CASE WHEN r.status = 'returned' THEN 1 END) 
//   AS rented_quantity,

//   GREATEST(
//     IFNULL(p.stock,0) 
//     - (
//         COUNT(sc.id)
//         - COUNT(CASE WHEN r.status = 'returned' THEN 1 END)
//       ),
//     0
//   ) AS stock,

//   p.mrp,
//   p.rent_price,
//   p.deposit_price,

//   COUNT(sc.id) AS times_rented,
//   MAX(sc.created_at) AS last_rented,

//   CASE
//     WHEN GREATEST(
//       IFNULL(p.stock,0) 
//       - (
//           COUNT(sc.id)
//           - COUNT(CASE WHEN r.status = 'returned' THEN 1 END)
//         ),
//       0
//     ) = 0
//       THEN 'Out of Stock'

//     WHEN GREATEST(
//       IFNULL(p.stock,0) 
//       - (
//           COUNT(sc.id)
//           - COUNT(CASE WHEN r.status = 'returned' THEN 1 END)
//         ),
//       0
//     ) <= p.min_stock
//       THEN 'Low Stock'

//     ELSE 'Healthy Stock'
//   END AS stock_status

// FROM shop_product p

// LEFT JOIN category c
// ON p.subcategory_id = c.id

// LEFT JOIN shop_checkout_new sc
// ON p.id = sc.product_id
// AND sc.status = 'pending'
// LEFT JOIN shop_returnlist_table r
// ON sc.id = r.order_id

// GROUP BY
//   p.id,
//   p.code,
//   p.name,
//   c.category_name,
//   p.subcategory_id,
//   p.size,
//   p.color,
//   p.stock,
//   p.min_stock,
//   p.mrp,
//   p.rent_price,
//   p.deposit_price

// ORDER BY p.name ASC;
// `;

//   db.query(query, (err, results) => {

//     if (err) {
//       console.error("Error fetching inventory:", err);
//       return res.status(500).json(err);
//     }

//     res.json(results);

//   });
// };




















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
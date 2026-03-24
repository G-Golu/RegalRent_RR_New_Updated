const db = require("../../config/db");

// 1️⃣ User → Admin Orders
exports.getAdminUserOrders = (req, res) => {
  const sql = `
    SELECT 
      order_code,
      user_name,
      product_name,
      quantity,
      total_amount,
      order_status,
      ordered_at
    FROM admin_user_orders
    ORDER BY ordered_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// 2️⃣ Shop-Admin → Admin Orders
exports.getAdminShopOrders = (req, res) => {
  const sql = `
    SELECT
      order_code,
      shop_name,
      product_name,
      quantity,
      discount_percent,
      total_amount,
      order_status,
      ordered_at
    FROM admin_shop_orders
    ORDER BY ordered_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

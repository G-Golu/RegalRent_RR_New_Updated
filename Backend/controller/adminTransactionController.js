import db from "../config/db.js";

export const getAllTransactions = (req, res) => {
  const sql = `
    SELECT 
      transaction_id,
      transaction_type,
      user_name,
      shop_name,
      product_name,
      amount,
      payment_method,
      status,
      DATE(created_at) as date
    FROM transactions
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("MYSQL ERROR ", err);
      return res.status(500).json(err);
    }
    res.json(rows);
  });
};

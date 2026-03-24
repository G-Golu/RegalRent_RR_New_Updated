import db from "../../config/db.js";

/* ================= ADD TO CART ================= */
export const addToCart = (req, res) => {
   console.log("BODY:", req.body); 
  const {
    user_id,
    product_id,
    size,
    start_date,
    end_date,
    total_days,
    rent_amount,
    deposit_amount,
    total_amount
  } = req.body;

  const sql = `
    INSERT INTO shop_cart
    (user_id, product_id, size, start_date, end_date,
     total_days, rent_amount, deposit_amount, total_amount)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      user_id,
      product_id,
      size,
      start_date,
      end_date,
      total_days,
      rent_amount,
      deposit_amount,
      total_amount
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Added to cart successfully" });
    }
  );
};


/* ================= GET CART ================= */
export const getCart = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT 
      c.*,
      p.name,
      p.code,
      p.image,
      p.color
    FROM shop_cart c
    JOIN shop_product p ON c.product_id = p.id
    WHERE c.user_id = ?
    ORDER BY c.id DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};


/* ================= REMOVE ITEM ================= */
export const removeCartItem = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM shop_cart WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Item removed" });
    }
  );
};

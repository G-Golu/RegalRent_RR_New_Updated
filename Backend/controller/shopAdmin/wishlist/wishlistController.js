import db from "../../../config/db.js";

/* ================= ADD TO WISHLIST ================= */
export const addToWishlist = (req, res) => {
    console.log("REQ BODY:", req.body);
  const { user_id, product_id } = req.body;

  if (!user_id || !product_id) {
    return res.status(400).json({
      success: false,
      message: "user_id and product_id required"
    });
  }

  // 🔥 check duplicate
  const checkSql = `
    SELECT * FROM shop_wishlist
    WHERE user_id = ? AND product_id = ?
  `;

  db.query(checkSql, [user_id, product_id], (err, existing) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    if (existing.length > 0) {
      return res.json({
        success: true,
        message: "Already in wishlist ❤️"
      });
    }

    const insertSql = `
      INSERT INTO shop_wishlist (user_id, product_id)
      VALUES (?, ?)
    `;

    db.query(insertSql, [user_id, product_id], (err) => {
      if (err) return res.status(500).json({ success: false, error: err.message });

      res.json({
        success: true,
        message: "Added to wishlist ❤️"
      });
    });
  });
};


/* ================= GET WISHLIST ================= */
export const getWishlist = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId required"
    });
  }

  const sql = `
    SELECT 
      w.id,
      w.product_id,
      p.name,
      p.code,
      p.image,
      p.rent_price
    FROM shop_wishlist w
    JOIN shop_product p ON w.product_id = p.id
    WHERE w.user_id = ?
    ORDER BY w.id DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    res.json({
      success: true,
      wishlist: result
    });
  });
};


/* ================= REMOVE FROM WISHLIST ================= */
export const removeWishlist = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM shop_wishlist WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ success: false, error: err.message });

      res.json({
        success: true,
        message: "Removed from wishlist ❌"
      });
    }
  );
};
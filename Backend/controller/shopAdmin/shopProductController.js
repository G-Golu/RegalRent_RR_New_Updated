

// it all ok 
import db from "../../config/db.js";


// ================= GET ALL PRODUCTS =================
export const getProducts = (req, res) => {
  const sql = `
    SELECT 
      p.id,
      p.code,
      p.name,
      p.subcategory_id,
      c.name AS subcategory_name,
      p.mrp,
      p.rent_price,
      p.deposit_price,
      stock,
      p.color,
      p.size,
      p.status,
      p.image,
      p.created_at
    FROM shop_product p
    LEFT JOIN shop_category c 
      ON p.subcategory_id = c.id
    ORDER BY p.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("GET PRODUCTS ERROR:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
};


// ================= CREATE PRODUCT =================
export const createProduct = (req, res) => {
  const {
    code,
    name,
    subcategory_id,
    mrp,
    rent_price,
    deposit_price,
   stock,
    color,
    size,
    status,
  } = req.body;

  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO shop_product 
    (code, name, subcategory_id, mrp, rent_price, deposit_price, stock, color, size, status, image)
    VALUES (?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?)
  `;
  // added new stock for product quantity

  db.query(
    sql,
    [
      code,
      name,
      subcategory_id,
      mrp,
      rent_price,
      deposit_price,
      stock,
      color,
      size,
      status,
      image,
    ],
    (err) => {
      if (err) {
        console.error("CREATE PRODUCT ERROR:", err);
        return res.status(500).json({ error: err.message });
      }

      res.json({ message: "Product created successfully" });
    }
  );
};


// ================= TOGGLE PRODUCT STATUS =================
export const toggleProductStatus = (req, res) => {
  const { id, status } = req.body;

  const sql = `UPDATE shop_product SET status=? WHERE id=?`;

  db.query(sql, [status, id], (err) => {
    if (err) {
      console.error("TOGGLE STATUS ERROR:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Status updated successfully" });
  });
};


// ================= UPDATE PRODUCT =================
export const updateProduct = (req, res) => {
  const { id } = req.params;

  const {
    code,
    name,
    subcategory_id,
    mrp,
    rent_price,
    deposit_price,
    stock,
    color,
    size,
    status,
    oldImage,
  } = req.body;

  const image = req.file ? req.file.filename : oldImage;

  const sql = `
    UPDATE shop_product
    SET code=?, 
        name=?, 
        subcategory_id=?, 
        mrp=?, 
        rent_price=?, 
        deposit_price=?, 
        stock=?,
        color=?, 
        size=?, 
        status=?, 
        image=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      code,
      name,
      subcategory_id,
      mrp,
      rent_price,
      deposit_price, 
      stock,
      color,
      size,
      status,
      image,
      id,
    ],
    (err) => {
      if (err) {
        console.error("UPDATE PRODUCT ERROR:", err);
        return res.status(500).json({ error: err.message });
      }

      res.json({ message: "Product updated successfully" });
    }
  );
};

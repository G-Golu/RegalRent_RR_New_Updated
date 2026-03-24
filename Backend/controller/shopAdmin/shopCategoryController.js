// import db from "../../config/db.js";

// // GET all categories
// export const getCategories = (req, res) => {
//   const sql = "SELECT * FROM shop_category ORDER BY id DESC";

//   db.query(sql, (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result);
//   });
// };


// // CREATE category
// export const createCategory = (req, res) => {
  
//   const { name, master, status, image } = req.body;

//   const sql =
//     "INSERT INTO shop_category (name, master, status, image) VALUES (?,?,?,?)";

//   db.query(sql, [name, master, status, image], (err) => {
//     if (err) return res.status(500).json(err);
//     res.json({ message: "Category created" });
//   });
// };

// // UPDATE category
// export const updateCategory = (req, res) => {
//   const { id } = req.params;
//   const { name, master, status, image } = req.body;

//   const sql = `
//     UPDATE shop_category
//     SET name=?, master=?, status=?, image=?
//     WHERE id=?
//   `;

//   db.query(sql, [name, master, status, image, id], (err) => {
//     if (err) return res.status(500).json(err);
//     res.json({ message: "Category updated" });
//   });
// };

// // TOGGLE status
// export const toggleCategoryStatus = (req, res) => {
//   const { id, status } = req.body;

//   const sql = "UPDATE shop_category SET status=? WHERE id=?";

//   db.query(sql, [status, id], (err) => {
//     if (err) return res.status(500).json(err);
//     res.json({ message: "Status updated" });
//   });
// };

// today is 23-02-2026
















import db from "../../config/db.js";

/* ================= GET ================= */
export const getCategories = (req, res) => {
  const sql = "SELECT * FROM shop_category ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};


/* ================= CREATE ================= */
export const createCategory = (req, res) => {

  const { name, master, status } = req.body;

  // ✅ get image from multer
  const image = req.file
    ? `/uploads/shopUploads/${req.file.filename}`
    : null;

  const sql =
    "INSERT INTO shop_category (name, master, status, image) VALUES (?,?,?,?)";

  db.query(sql, [name, master, status, image], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Category created" });
  });
};


/* ================= UPDATE ================= */
export const updateCategory = (req, res) => {

  const { id } = req.params;
  const { name, master, status } = req.body;

  // ✅ get image from multer
  const image = req.file
    ? `/uploads/shopUploads/${req.file.filename}`
    : null;

  // if image uploaded → update image
  // else → keep old image
  const sql = image
    ? `UPDATE shop_category SET name=?, master=?, status=?, image=? WHERE id=?`
    : `UPDATE shop_category SET name=?, master=?, status=? WHERE id=?`;

  const values = image
    ? [name, master, status, image, id]
    : [name, master, status, id];

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Category updated" });
  });
};


/* ================= STATUS ================= */
export const toggleCategoryStatus = (req, res) => {

  const { id, status } = req.body;

  const sql = "UPDATE shop_category SET status=? WHERE id=?";

  db.query(sql, [status, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Status updated" });
  });

};
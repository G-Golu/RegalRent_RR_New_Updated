// import db from "../config/db.js";

// export const addCategory = (req, res) => {
//   try {
//     const { seller_name, product_name } = req.body;

//     if (!seller_name || !product_name || !req.file) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     // ✅ correct upload folder path
//     const product_image = `/uploads/shopUploads/${req.file.filename}`;

//     // ✅ correct table name
//     const sql =
//       "INSERT INTO category (seller_name, product_name, product_image) VALUES (?, ?, ?)";

//     db.query(sql, [seller_name, product_name, product_image], (err, result) => {
//       if (err) {
//         console.error("MYSQL ERROR ❌", err);
//         return res.status(500).json(err);
//       }

//       res.status(201).json({
//         message: "Category added successfully",
//         id: result.insertId,
//       });
//     });
//   } catch (err) {
//     console.error("SERVER ERROR ❌", err);
//     res.status(500).json(err);
//   }
// };

// export const getCategory = (req, res) => {
//   db.query("SELECT * FROM category ORDER BY id DESC", (err, rows) => {
//     if (err) {
//       console.error("MYSQL ERROR ❌", err);
//       return res.status(500).json(err);
//     }
//     res.json(rows);
//   });
// };












// import db from "../config/db.js"
import db from "../config/db.js";

export const addCategory = (req, res) => {
  try {
    const { category_name, status } = req.body;

    if (!category_name || !status || !req.file) {
      return res.status(400).json({ message: "All fields required" });
    }

    const category_image = `/uploads/shopUploads/${req.file.filename}`;

    const sql = `
      INSERT INTO category (category_name, category_image, status)
      VALUES (?, ?, ?)
    `;

    db.query(
      sql,
      [category_name, category_image, status],
      (err, result) => {
        if (err) {
          console.error("MYSQL ERROR ❌", err);
          return res.status(500).json(err);
        }

        res.status(201).json({
          message: "Category added successfully",
          id: result.insertId,
        });
      }
    );
  } catch (err) {
    console.error("SERVER ERROR ❌", err);
    res.status(500).json(err);
  }
};

export const getCategory = (req, res) => {
  db.query(
    "SELECT * FROM category ORDER BY id DESC",
    (err, rows) => {
      if (err) {
        console.error("MYSQL ERROR ❌", err);
        return res.status(500).json(err);
      }
      res.json(rows);
    }
  );
};





// today add for delete and update add . 18-03-2026


// ================= UPDATE =================
export const updateCategory = (req, res) => {
  const { id } = req.params;
  const { category_name, status } = req.body;

  let sql = "";
  let values = [];

  if (req.file) {
    const category_image = `/uploads/shopUploads/${req.file.filename}`;

    sql = `UPDATE category SET category_name=?, category_image=?, status=? WHERE id=?`;
    values = [category_name, category_image, status, id];
  } else {
    sql = `UPDATE category SET category_name=?, status=? WHERE id=?`;
    values = [category_name, status, id];
  }

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated" });
  });
};


// ================= DELETE =================
export const deleteCategory = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM category WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
};
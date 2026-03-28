


import db from "../config/db.js"
/* =========================
   CREATE PACKAGE
========================= */
export const package_create = (req, res) => {
  const { package_name, days, price, description } = req.body;

  if (!package_name || !days || !price) {
    return res.status(400).json({
      message: "Required fields missing",
    });
  }

  const sql = `
    INSERT INTO package_create
    (package_name, days, price, description)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [package_name, days, price, description || null],
    (err, result) => {
      if (err) {
        console.error("DB ERROR (CREATE):", err);
        return res.status(500).json({
          message: "Database error",
          error: err,
        });
      }

      res.status(201).json({
        message: "Package created successfully",
        id: result.insertId,
      });
    }
  );
};

/* =========================
   GET ALL PACKAGES
========================= */
export const getPackages = (req, res) => {
  const sql = `
    SELECT * FROM package_create
    ORDER BY id DESC
  `;

  db.query(sql, (err, data) => {
    if (err) {
      console.error("DB ERROR (GET):", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(data);
  });
};



/* =========================
   UPDATE PACKAGE
========================= */
export const updatePackage = (req, res) => {
  const { id } = req.params;
  const { package_name, days, price, description } = req.body;

  const sql = `
    UPDATE package_create
    SET package_name = ?, days = ?, price = ?, description = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [package_name, days, price, description || null, id],
    (err, result) => {
      if (err) {
        console.error("DB ERROR (UPDATE):", err);
        return res.status(500).json({
          message: "Database error",
        });
      }

      res.json({
        message: "Package updated successfully",
      });
    }
  );
};


/* =========================
   ENABLE / DISABLE PACKAGE
========================= */
export const togglePackage = (req, res) => {
  
  const { id } = req.params;
  const { status } = req.body;
  // console.log("TOGGLE HIT", id, status);

  // 1️⃣ Update package status
  db.query(
    "UPDATE package_create SET status=? WHERE id=?",
    [status, id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Package update failed" });
      }

      // 2️⃣ ALSO update stores using this package
      db.query(
        "UPDATE stores SET status=? WHERE package_id=?",
        [status, id],
        (err2) => {
          if (err2) {
            console.error(err2);
            return res.status(500).json({
              message: "Store status update failed",
            });
          }

          res.json({
            message: "Package + related stores updated successfully",
          });
        }
      );
    }
  );
};
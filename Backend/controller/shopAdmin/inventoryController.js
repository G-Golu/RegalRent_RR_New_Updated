import db from "../../config/db.js";

// GET inventory (page load)
export const getInventory = (req, res) => {
  const sql = "SELECT * FROM shop_inventory WHERE id = 1";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("GET inventory error:", err);
      return res.status(500).json(err);
    }

    // 👇 prevent crash if table is empty
    if (result.length === 0) {
      return res.json({
        available: 0,
        rented: 0,
        damage: 0,
      });
    }

    res.json(result[0]);
  });
};

// UPDATE inventory (save button)
export const updateInventory = (req, res) => {
  const { available, rented, damage } = req.body;

  const checkSql = "SELECT id FROM shop_inventory WHERE id = 1";

  db.query(checkSql, (err, result) => {
    if (err) {
      console.error("CHECK inventory error:", err);
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      // FIRST TIME → INSERT
      const insertSql = `
        INSERT INTO shop_inventory (id, available, rented, damage)
        VALUES (1, ?, ?, ?)
      `;

      db.query(insertSql, [available, rented, damage], (err) => {
        if (err) {
          console.error("INSERT inventory error:", err);
          return res.status(500).json(err);
        }
        res.json({ message: "Inventory created successfully" });
      });
    } else {
      // NORMAL UPDATE
      const updateSql = `
        UPDATE shop_inventory
        SET available = ?, rented = ?, damage = ?
        WHERE id = 1
      `;

      db.query(updateSql, [available, rented, damage], (err) => {
        if (err) {
          console.error("UPDATE inventory error:", err);
          return res.status(500).json(err);
        }
        res.json({ message: "Inventory updated successfully" });
      });
    }
  });
};

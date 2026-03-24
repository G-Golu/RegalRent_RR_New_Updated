import db from "../../config/db.js";

// ADD STAFF
// ADD STAFF
export const addStaff = (req, res) => {
  const { id, name, number } = req.body;

  const sql =
    "INSERT INTO staff_detail (staff_id, name, number) VALUES (?, ?, ?)";

  db.query(sql, [id, name, number], (err, result) => {
    if (err) {
      console.log("Insert Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ message: "Staff added successfully" });
  });
  
};

// update here 
export const updateStaff = (req, res) => {
  const { id } = req.params;
  const { staff_id, name, number } = req.body;

  const sql =
    "UPDATE staff_detail SET staff_id=?, name=?, number=? WHERE id=?";

  db.query(sql, [staff_id, name, number, id], (err, result) => {
    if (err) {
      console.log("Update Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ message: "Staff updated successfully" });
  });
};

// delete here 
export const deleteStaff = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM staff_detail WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Delete Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ message: "Staff deleted successfully" });
  });
};


// GET STAFF
export const getStaff = (req, res) => {
  const sql = "SELECT * FROM staff_detail ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("Fetch Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(result);
  });
};
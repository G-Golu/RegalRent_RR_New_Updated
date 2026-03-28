


import express from "express";
import bcrypt from "bcryptjs";
import db from "../config/db.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

/* ================= ROLE MAP ================= */

const roleMap = {
  admin: 1,
  "shop-admin": 2,
  user: 3,
};

/* ================= GET USERS ================= */


router.get("/", (req, res) => {

  const sql = `
    SELECT 
      u.id,
      u.name,
      u.email,
      u.status,
      u.manual_status,
      r.name AS role,
      u.created_at,
      u.profile_image,
      s.created_at AS store_created,
      s.id AS store_id,
      p.days
    FROM users_new u
    LEFT JOIN roles r ON u.role_id = r.id
    LEFT JOIN stores s ON s.user_id = u.id
    LEFT JOIN package_create p ON s.package_id = p.id
    ORDER BY u.id DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.error("GET USERS ERROR:", err);
      return res.status(500).json(err);
    }

    const today = new Date();

    const users = result.map((user) => {

      let package_status = "active";

      if (user.store_created && user.days) {

        const created = new Date(user.store_created);
        const expiry = new Date(created);

        expiry.setDate(created.getDate() + Number(user.days));

        if (today > expiry) {
          package_status = "inactive";
        }

      }

      // FINAL STATUS
      const finalStatus =
        user.manual_status === "inactive" || package_status === "inactive"
          ? "inactive"
          : "active";

      return {
        ...user,
        status: finalStatus,
        package_status
      };

    });

    res.json(users);

  });

});
/* ================= ADD USER ================= */


router.post("/", async (req, res) => {

  const { name, email, password, role, manual_status } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const role_id = roleMap[role] || 3;

  // default manual status
  const manualStatus = manual_status || "active";

  const sql = `
    INSERT INTO users_new 
    (name, email, password, role_id, manual_status, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, hashedPassword, role_id, manualStatus, manualStatus],
    (err, result) => {

      if (err) {
        console.error("ADD USER ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({
        id: result.insertId,
        name,
        email,
        role,
        manual_status: manualStatus,
        status: manualStatus
      });

    }
  );
});

/* ================= UPDATE PROFILE ================= */

router.put(
  "/update-profile/:id",
  upload.single("avatar"),
  (req, res) => {

    const { name, email, phone } = req.body;

    const profile_image = req.file?.path || null;

    const sql = `
      UPDATE users_new
      SET name=?, email=?, phone=?, profile_image=?
      WHERE id=?
    `;

    db.query(
      sql,
      [name, email, phone, profile_image, req.params.id],
      (err) => {

        if (err) {
          console.error("UPDATE PROFILE ERROR:", err);
          return res.status(500).json(err);
        }

        res.json({
          message: "Profile updated successfully",
          name,
          email,
          phone,
          profile_image,
        });

      }
    );
  }
);

/* ================= UPDATE USER ================= */


router.put("/:id", (req, res) => {

  const { role, manual_status } = req.body;

  const role_id = roleMap[role] || 3;

  const sql = `
    UPDATE users_new
    SET role_id=?, manual_status=?
    WHERE id=?
  `;

  db.query(
    sql,
    [role_id, manual_status, req.params.id],
    (err) => {

      if (err) {
        console.error("UPDATE USER ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({ message: "User updated successfully" });

    }
  );

});

/* ================= DELETE USER ================= */

router.delete("/:id", (req, res) => {

  const sql = "DELETE FROM users_new WHERE id=?";

  db.query(sql, [req.params.id], (err) => {

    if (err) {
      console.error("DELETE USER ERROR:", err);
      return res.status(500).json(err);
    }

    res.json({ message: "Deleted successfully" });

  });

});

export default router;
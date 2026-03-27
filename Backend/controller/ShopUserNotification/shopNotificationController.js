import db from "../../config/db.js";

/* ================= GET USER NOTIFICATIONS ================= */
export const getUserNotifications = (req, res) => {
  const userId = req.user.id; // middleware must set req.user

  db.query(
    "SELECT * FROM shop_user_notifications WHERE user_id=? ORDER BY created_at DESC",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        notifications: results
      });
    }
  );
};

/* ================= MARK NOTIFICATION AS READ ================= */
export const markNotificationAsRead = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  db.query(
    "UPDATE shop_user_notifications SET is_read=1 WHERE id=? AND user_id=?",
    [id, userId],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ success: true, message: "Notification marked as read" });
    }
  );
};

/* ================= INSERT NOTIFICATION ================= */
export const insertNotification = (user_id, message) => {
  if (!user_id || !message) return;

  db.query(
    "INSERT INTO shop_user_notifications (user_id, message, is_read) VALUES (?, ?, 0)",
    [user_id, message],
    (err) => {
      if (err) console.error("Notification insert error:", err);
      else console.log("Notification saved ✅");
    }
  );
};
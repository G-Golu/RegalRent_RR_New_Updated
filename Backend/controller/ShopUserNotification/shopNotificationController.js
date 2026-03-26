import db from "../../config/db.js";

// GET notifications for logged-in user
export const getUserNotifications = (req, res) => {
  const userId = req.user.id; // assume middleware sets req.user

  db.query(
    "SELECT * FROM shop_user_notification WHERE user_id=? AND is_read=0 ORDER BY created_at DESC",
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



// POST /notifications/read/:id
export const markNotificationAsRead = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  db.query(
    "UPDATE shop_user_notification SET is_read=1 WHERE id=? AND user_id=?",
    [id, userId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ success: true, message: "Notification marked as read" });
    }
  );
};
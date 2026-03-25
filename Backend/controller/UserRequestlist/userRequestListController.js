import db from "../../config/db.js";

// ================= GET ALL REQUESTS =================
export const getUserRequests = (req, res) => {
  const query = `
    SELECT 
      id,
      full_name,
      email,
      mobile_number,
      whatsapp_number,
      address,
      selected_plan,
      created_at
    FROM contacts_table
    ORDER BY created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching user requests:", err);
      return res.status(500).json({ error: "Failed to fetch user requests" });
    }

    res.status(200).json({ data: results });
  });
};

// ================= 🔔 GET UNREAD COUNT =================
export const getUnreadCount = (req, res) => {
  const query = `
    SELECT COUNT(*) AS count 
    FROM contacts_table 
    WHERE is_seen = 0
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching count:", err);
      return res.status(500).json({ error: err });
    }

    res.json({ count: result[0].count });
  });
};

// ================= ✅ MARK ALL AS SEEN =================
export const markAllAsSeen = (req, res) => {
  const query = `
    UPDATE contacts_table 
    SET is_seen = 1 
    WHERE is_seen = 0
  `;

  db.query(query, (err) => {
    if (err) {
      console.error("Error updating:", err);
      return res.status(500).json({ error: err });
    }

    res.json({ message: "All marked as seen" });
  });
};
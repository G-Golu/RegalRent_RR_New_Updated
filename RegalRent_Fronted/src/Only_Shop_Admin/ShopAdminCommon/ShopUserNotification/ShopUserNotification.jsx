import { useEffect, useState } from "react";
import axios from "axios";
import "./shopNotification.css";

const API_URL = "http://localhost:5000/api/shop-user-notification";

const ShopNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getToken = () => localStorage.getItem("token");

  /* ================= FETCH ================= */
  const fetchNotifications = async () => {
    try {
      const token = getToken();
      if (!token) {
        setError("User not authenticated");
        return;
      }

      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.success) {
        setNotifications(res.data.notifications || []);
      } else {
        setError("Failed to fetch notifications");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= MARK AS READ ================= */
  const markAsRead = async (id) => {
    const token = getToken();
    if (!token) return;

    // Optimistic UI update
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, is_read: 1 } : n
      )
    );

    try {
      await axios.post(
        `${API_URL}/read/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.error("Mark as read failed:", err);

      // rollback if failed
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, is_read: 0 } : n
        )
      );
    }
  };

  useEffect(() => {
    fetchNotifications();

    // 🔥 Optional: Auto refresh every 10 sec
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  /* ================= UI ================= */

  if (loading) return <p className="loading">Loading notifications...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="shop-notifications">
      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p className="empty">No new notifications</p>
      ) : (
        <ul>
          {notifications.map((note) => (
            <li
              key={note.id}
              className={`notification-item ${
                note.is_read ? "read" : "unread"
              }`}
              onClick={() => !note.is_read && markAsRead(note.id)}
            >
              <div className="content">
                <p>{note.message}</p>
                <span>
                  {new Date(note.created_at).toLocaleString()}
                </span>
              </div>

              {!note.is_read && <span className="dot"></span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShopNotifications;
import { useEffect, useState } from "react";
import axios from "axios";
import "./shopNotification.css"; // create CSS for styling

const ShopNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/shop-user-notification/", {
        withCredentials: true // if using cookies
      });
      if (res.data.success) {
        setNotifications(res.data.notifications);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/shop/notifications/read/${id}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        // update state locally
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, is_read: 1 } : n))
        );
      }
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) return <p>Loading notifications...</p>;

  if (notifications.length === 0) return <p>No new notifications.</p>;

  return (
    <div className="shop-notifications">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((note) => (
          <li
            key={note.id}
            className={note.is_read ? "read" : "unread"}
            onClick={() => !note.is_read && markAsRead(note.id)}
          >
            <p>{note.message}</p>
            <span>{new Date(note.created_at).toLocaleString()}</span>
            {!note.is_read && <span className="dot"></span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopNotifications;
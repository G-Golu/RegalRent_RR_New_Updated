import axios from "axios";

// existing
export const getUserRequests = async () => {
  const response = await axios.get("http://localhost:5000/api/user_requestlist");
  return response.data;
};

// ✅ NEW: get unread count
export const getUnreadCount = async () => {
  const res = await axios.get("http://localhost:5000/api/user_requestlist/unread-count");
  return res.data;
};

// ✅ NEW: mark all as seen
export const markAllAsSeen = async () => {
  const res = await axios.put("http://localhost:5000/api/user_requestlist/mark-seen");
  return res.data;
};
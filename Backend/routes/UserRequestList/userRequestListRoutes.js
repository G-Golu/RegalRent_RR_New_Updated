import express from "express";

import {
  getUserRequests,
  getUnreadCount,
  markAllAsSeen,
} from "../../controller/UserRequestlist/userRequestListController.js";

const router = express.Router();

// ================= MAIN =================
router.get("/", getUserRequests);

// ================= 🔔 NOTIFICATION =================
router.get("/unread-count", getUnreadCount);
router.put("/mark-seen", markAllAsSeen);

export default router;
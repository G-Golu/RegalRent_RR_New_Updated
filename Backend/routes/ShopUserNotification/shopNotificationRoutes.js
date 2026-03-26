import express from "express";
import { getUserNotifications, markNotificationAsRead } from "../../controller/ShopUserNotification/shopNotificationController.js";
import  authMiddleware  from "../auth.js"; // assume JWT or session auth

const router = express.Router();

router.get("/", authMiddleware, getUserNotifications);
router.post("/read/:id", authMiddleware, markNotificationAsRead);

export default router;
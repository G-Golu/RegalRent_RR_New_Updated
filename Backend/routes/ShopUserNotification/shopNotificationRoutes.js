import express from "express";
import { getUserNotifications, markNotificationAsRead } from "../../controller/ShopUserNotification/shopNotificationController.js";
import  {verifyToken }  from "../../middleware/verifyToken.js"; //  correct , this is user authentication check

const router = express.Router();

router.get("/", verifyToken, getUserNotifications);
router.post("/read/:id", verifyToken, markNotificationAsRead);

export default router;
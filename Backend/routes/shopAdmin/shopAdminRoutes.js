//NOTE: THIS PAGE USE FOR SHOP-ADMIN PROFILE IMAGE
// NOTE: THIS PAGE USE FOR SHOP-ADMIN PROFILE
import express from "express";
import multer from "multer";
import {
  updateProfile,
  getProfile,
} from "../../controller/shopAdmin/shopAdminController.js";

const router = express.Router();

// Multer memory storage
const upload = multer({
  storage: multer.memoryStorage(),
});

// ✅ Get Profile (Header use karega)
router.get("/profile", getProfile);

// ✅ Update Profile (Name + Avatar)
router.put("/profile", upload.single("avatar"), updateProfile);

export default router;

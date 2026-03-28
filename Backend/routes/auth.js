

import express from "express";
import { register, login , getProfile, updateProfileImage  } from "../controller/authController.js";

// updateProfile is admin side profile , update controller

//  " updateProfileImage, getProfile " new added for shop-admin profile image upload and retrive 
// today is : 10-03-2026





const router = express.Router();

/* ================= AUTH ROUTES ================= */

router.post("/register", register);
router.post("/login", login);



/* ================= SHOP-ADMIN PROFILE ROUTES ================= */

router.get("/profile", getProfile);
router.post("/update-profile-image", updateProfileImage);


export default router;





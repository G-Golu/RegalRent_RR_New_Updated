
import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  toggleCategoryStatus,
} from "../../controller/shopAdmin/shopCategoryController.js";

import categoryUpload from "../../middleware/categoryUpload.js";

const router = express.Router();

router.get("/", getCategories);

// ✅ add upload middleware
router.post("/", categoryUpload.single("image"), createCategory);

// ✅ add upload middleware
router.put("/:id", categoryUpload.single("image"), updateCategory);

router.patch("/status", toggleCategoryStatus);

export default router;
// import express from "express";
// import categoryUpload from "../middleware/categoryUpload.js";
// import { addCategory, getCategory } from "../controller/categoryController.js";

// const router = express.Router();

// router.post(
//   "/add",
//   categoryUpload.single("product_image"), //  MUST MATCH FormData
//   addCategory
// );

// router.get("/", getCategory);

// export default router;



//  all are good only comment for add update and delete , 18-03-2026










import express from "express";
import categoryUpload from "../middleware/categoryUpload.js";
import {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controller/categoryController.js";

const router = express.Router();

/* ================= ADD ================= */
router.post(
  "/add",
  categoryUpload.single("product_image"),
  addCategory
);

/* ================= UPDATE ================= */
router.put(
  "/:id",
  categoryUpload.single("product_image"), // ✅ correct name
  updateCategory
);

/* ================= DELETE ================= */
router.delete("/:id", deleteCategory);

/* ================= GET ================= */
router.get("/", getCategory);

export default router;



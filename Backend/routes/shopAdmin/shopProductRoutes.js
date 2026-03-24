// import express from "express";
// import {
//   getProducts,
//   createProduct,
//   updateProduct,
//   toggleProductStatus,
// } from "../../controller/shopAdmin/shopProductController.js";

// const router = express.Router();

// router.get("/", getProducts);
// router.post("/", createProduct);
// router.put("/:id", updateProduct);
// router.patch("/status", toggleProductStatus);

// export default router;

// ALL ARE CORRECT CURRENTLY NO ANY DOURT













import express from "express";
import multer from "multer";
import path from "path";

import {
  getProducts,
  createProduct,
  updateProduct,
  toggleProductStatus,
} from "../../controller/shopAdmin/shopProductController.js";

const router = express.Router();

/* ================= MULTER CONFIG ================= */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", getProducts);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.patch("/status", toggleProductStatus);

export default router;






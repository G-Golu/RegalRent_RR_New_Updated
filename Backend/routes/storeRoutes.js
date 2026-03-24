// import express from "express";
// import multer from "multer";
// import path from "path";
// import {
//   createStore,
//   getStores,
//   updateStore,
//   deleteStore,
// } from "../controller/storeController.js";

// const router = express.Router();

// // ===== MULTER SETUP =====
// const storage = multer.diskStorage({
//   destination: "uploads/logos",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // ===== ROUTES =====
// router.get("/", getStores);
// router.post("/", upload.single("logo"), createStore);
// router.put("/:id", upload.single("logo"), updateStore);
// router.delete("/:id", deleteStore);

// export default router;

// // currently use


// comment for render category in card today is 06-03-2026











import express from "express";
import multer from "multer";
import path from "path";
import {
  createStore,
  getStores,
  updateStore,
  deleteStore,
} from "../controller/storeController.js";

const router = express.Router();

// ===== MULTER SETUP =====
const storage = multer.diskStorage({
  destination: "uploads/logos",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ===== ROUTES =====
router.get("/", getStores);
router.post("/", upload.single("logo"), createStore);
router.put("/:id", upload.single("logo"), updateStore);
router.delete("/:id", deleteStore);

export default router;









// import multer from "multer";
// import path from "path";

// /* ================= STORAGE ================= */
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/shopUploads");
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   },
// });

// /* ================= FILE FILTER ================= */
// const fileFilter = (req, file, cb) => {
//   if (file.fieldname === "product_image") {
//     cb(null, true);
//   } else {
//     cb(new Error("Unexpected field"), false);
//   }
// };

// /* ================= UPLOAD ================= */
// const categoryUpload = multer({
//   storage,
//   fileFilter,
//   //  limits: {
//   //   fileSize: 5 * 1024 * 1024, // 5MB max
//   //   },
// });

// export default categoryUpload;

// today : 23-02-26






















import multer from "multer";
import path from "path";
import fs from "fs";

/* ================= CREATE FOLDER IF NOT EXISTS ================= */
const uploadPath = "uploads/shopUploads";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

/* ================= STORAGE ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, fileName);
  },
});

/* ================= FILE FILTER ================= */
const fileFilter = (req, file, cb) => {

  // allow only images
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }

};

/* ================= UPLOAD ================= */
const categoryUpload = multer({
  storage,
  fileFilter,

  // unlimited size (set very large)
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1GB per image
  },

});

export default categoryUpload;
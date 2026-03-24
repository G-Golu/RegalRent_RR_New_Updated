// import express from "express";
// import {
//   package_create,
//   getPackages,
//   updatePackage,
//   togglePackage,
// } from "../controller/packageController.js";

// const router = express.Router();

// router.post("/", package_create);            // CREATE
// router.get("/", getPackages);               // READ
// router.put("/:id", updatePackage);           // UPDATE
// router.put("/status/:id", togglePackage);    // STATUS

// export default router;































// currently use for it all good

import express from "express";
import {
  package_create,
  getPackages,
  updatePackage,
  togglePackage,
} from "../controller/packageController.js";

const router = express.Router();

router.post("/", package_create);            // CREATE
router.get("/", getPackages);               // READ
router.put("/:id", updatePackage);           // UPDATE
router.put("/status/:id", togglePackage);    // STATUS

export default router;


// currently use this all good



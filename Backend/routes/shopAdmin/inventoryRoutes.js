import express from "express";
import {
  getInventory,
  updateInventory,
} from "../../controller/shopAdmin/inventoryController.js";

const router = express.Router();

router.get("/", getInventory);
router.put("/", updateInventory);

export default router; // ✅ THIS IS REQUIRED

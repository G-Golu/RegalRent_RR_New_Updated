// inventoryReportRoutes.js
import express from "express";
import { getInventoryReport } from "../../controller/adminReports/inventoryReportController.js";

const router = express.Router();

router.get("/report", getInventoryReport);

export default router;
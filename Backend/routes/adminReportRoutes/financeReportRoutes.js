

import express from "express";
import { getFinanceReport } from "../../controller/adminReports/financeReportController.js";

const router = express.Router();

// No async/await needed here; controller handles res directly
router.get("/report", (req, res) => {
  getFinanceReport(req, res); 
});

export default router;
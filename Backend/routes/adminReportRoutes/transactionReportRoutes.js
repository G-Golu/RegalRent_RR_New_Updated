import express from "express";

import {
  getTransactionsReport,
  getPendingPayments,
  getRefundsReport,
  getAdvanceDepositReport,
  getInvoice
} from "../../controller/adminReports/transactionReportController.js";

const router = express.Router();

router.get("/report", getTransactionsReport);

router.get("/pending-payments", getPendingPayments);

router.get("/refunds", getRefundsReport);

router.get("/advance-deposit", getAdvanceDepositReport);

router.get("/invoice/:orderGroupId", getInvoice);

export default router;
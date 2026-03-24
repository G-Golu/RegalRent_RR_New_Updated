import express from "express";
import { getAllTransactions } from "../controller/adminTransactionController.js";

const router = express.Router();

router.get("/admin/admin_transactions", getAllTransactions);

export default router;

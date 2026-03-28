
// use for return 

import express from "express";
import { 
  createOrder, 
  getOrders,
  getOrderById
} from "../../../controller/shopAdmin/OrderHistory/OrderHistoryController.js";

const router = express.Router();

router.post("/order", createOrder);
router.get("/order", getOrders);
router.get("/order/:id", getOrderById);   //  ADD THIS

export default router;
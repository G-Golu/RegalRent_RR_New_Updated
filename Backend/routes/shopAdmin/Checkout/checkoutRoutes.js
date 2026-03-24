import express from "express";
import { createCheckout, getCheckoutList,  getCheckoutByGroupId } from "../../../controller/shopAdmin/Checkout/checkoutController.js";


const router = express.Router();

router.post("/create", createCheckout);
router.get("/list", getCheckoutList);

// for receipt 
router.get("/:orderGroupId", getCheckoutByGroupId);

// new add for payment status update | today 27-02-2026


export default router;

// NOTE : this is use for MyOrder Page


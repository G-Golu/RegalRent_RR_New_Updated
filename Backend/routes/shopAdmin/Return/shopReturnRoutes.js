import express from "express";
import { createReturn,  getReturnList ,  completeReturn } from "../../../controller/shopAdmin/Return/shopReturnController.js";



const router = express.Router();

router.post("/create", createReturn);
router.get("/list", getReturnList);

router.put("/complete-return", completeReturn);

export default router;
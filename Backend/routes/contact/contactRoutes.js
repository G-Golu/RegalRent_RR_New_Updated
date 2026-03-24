import express from "express";
import { submitContact , getPopularPlan } from "../../controller/contact/contactController.js";

const router = express.Router();

router.post("/", submitContact);

//   here is new api - based on most selected plan then auto add tag popular  today is : 24-03-2026 ====================
router.get("/popular-plan", getPopularPlan);

export default router;
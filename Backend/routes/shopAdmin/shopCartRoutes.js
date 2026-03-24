import express from "express";
import {
  addToCart,
  getCart,
  removeCartItem
} from "../../controller/shopAdmin/shopCartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", getCart);
router.delete("/:id", removeCartItem);

export default router;

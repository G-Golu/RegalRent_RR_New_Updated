import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeWishlist
} from "../../../controller/shopAdmin/wishlist/wishlistController.js";

const router = express.Router();

router.post("/add", addToWishlist);
router.get("/:userId", getWishlist);
router.delete("/:id", removeWishlist);

export default router;
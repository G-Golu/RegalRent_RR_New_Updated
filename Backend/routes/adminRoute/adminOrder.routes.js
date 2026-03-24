const express = require("express");
const router = express.Router();

const {
  getAdminUserOrders,
  getAdminShopOrders,
} = require("../controller/admin/adminOrder.controller");

// ADMIN → User Orders
router.get("/user-orders", getAdminUserOrders);

// ADMIN → Shop-Admin Orders
router.get("/shop-orders", getAdminShopOrders);

module.exports = router;



import db from "../../../config/db.js";
import { v4 as uuidv4 } from "uuid";

// ================= CREATE CHECKOUT =================
export const createCheckout = (req, res) => {
  console.log("CHECKOUT CONTROLLER HIT");

  const {
    products,
    pricing_type,
    rental_total,
    deposit_total,
    grand_total,
    advance_amount,
    due_amount,
    due_date,
    note,
    customer,
    staff
  } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: "No products provided" });
  }

  if (!customer || !staff) {
    return res.status(400).json({ message: "Customer or Staff data missing" });
  }

  const orderGroupId = uuidv4();

  const insertNext = (index) => {
    if (index >= products.length) {
      return res.status(201).json({
        success: true,
        orderGroupId,
      });
    }

    const item = products[index];

    const query = `
      INSERT INTO shop_checkout_new (
        order_group_id,
        product_id,
        product_name,
        delivery_date,
        return_date,
        rent_amount,
        deposit_amount,
        pricing_type,
        customer_name,
        phone,
        alt_phone,
        email,
        address,
        id_type,
        id_number,
        staff_id,
        staff_name,
        staff_mobile,
        rental_total,
        deposit_total,
        grand_total,
        advance_amount,
        due_amount,
        due_date,
        note,
        status,
        payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      orderGroupId,
      item.product_id ?? null,
      item.product_name ?? null,
      item.delivery_date ?? null,
      item.return_date ?? null,
      item.rent_amount ?? 0,
      item.deposit_amount ?? 0,
      pricing_type ?? null,

      customer.customer_name ?? null,
      customer.phone ?? null,
      customer.alt_phone ?? null,
      customer.email ?? null,
      customer.address ?? null,
      customer.id_type ?? null,
      customer.id_number ?? null,

      staff.staff_id ?? null,
      staff.staff_name ?? null,
      staff.staff_mobile ?? null,

      rental_total ?? 0,
      deposit_total ?? 0,
      grand_total ?? 0,
      advance_amount ?? 0,
      due_amount ?? 0,
      due_date ?? null,
      note ?? null,

      "pending",
      "NOT PAID"
    ];

    db.query(query, values, (err) => {
      if (err) {
        console.error("Checkout Insert Error:", err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      // ================= UPDATE PRODUCT STOCK =================
      const stockQuery = `
        UPDATE shop_product
        SET stock = stock - 1
        WHERE id = ? AND stock > 0
      `;

      db.query(stockQuery, [item.product_id], (stockErr) => {
        if (stockErr) {
          console.error("Stock Update Error:", stockErr);
          return res.status(500).json({
            success: false,
            message: stockErr.message,
          });
        }

        insertNext(index + 1);
      });
    });
  };

  insertNext(0);
};

// ================= GET LIST =================
export const getCheckoutList = (req, res) => {
  const query = `SELECT * FROM shop_checkout_new ORDER BY id DESC`;

  db.query(query, (err, rows) => {
    if (err) {
      console.error("Get Checkout List Error:", err);
      return res.status(500).json({ success: false, message: err.message });
    }

    res.status(200).json({ success: true, data: rows });
  });
};

// ================= GET CHECKOUT BY GROUP ID =================
export const getCheckoutByGroupId = (req, res) => {
  const { orderGroupId } = req.params;

  const sql = `
    SELECT *
    FROM shop_checkout_new
    WHERE order_group_id = ?
  `;

  db.query(sql, [orderGroupId], (err, rows) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: err.message });
    }

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const orderDetails = {
      id: rows[0].id,
      order_group_id: rows[0].order_group_id,
      customer_name: rows[0].customer_name,
      phone: rows[0].phone,
      address: rows[0].address,
      delivery_date: rows[0].delivery_date,
      return_date: rows[0].return_date,
      due_date: rows[0].due_date,
      rental_total: rows[0].rental_total,
      advance_amount: rows[0].advance_amount,
      due_amount: rows[0].due_amount,
      products: rows.map(row => ({
        product_name: row.product_name,
        rent_amount: row.rent_amount,
        delivery_date: row.delivery_date,
        return_date: row.return_date,
        deposit_amount: row.deposit_amount
      }))
    };

    res.json(orderDetails);
  });
};
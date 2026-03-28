

import db from "../../../config/db.js";

/* =======================================================
   CREATE ORDER
======================================================= */
export const createOrder = (req, res) => {
  const {
    products,
    customerData,
    priceMode,
    rentalTotal,
    depositTotal,
    grandTotal,
    advanceAmount,
    dueAmount
  } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: "Products required" });
  }

  // ✅ Calculate selectedDays
  const selectedDays = products.reduce((total, item) => {
    if (!item.start_date || !item.end_date) return total + 1;

    const start = new Date(item.start_date);
    const end = new Date(item.end_date);

    const diffTime = end - start;
    const diffDays =
      Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return total + (diffDays > 0 ? diffDays : 1);
  }, 0);

  const sql = `
    INSERT INTO shop_order_history
    (customer_name, phone, alt_phone, address,
     id_type, id_number, note,
     advance_amount, due_amount, due_date,
     rental_total, deposit_total, grand_total,
     price_mode, selected_days, products_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      customerData.customer_name,
      customerData.phone,
      customerData.alt_phone,
      customerData.address,
      customerData.id_type,
      customerData.id_number,
      customerData.note,
      advanceAmount,
      dueAmount,
      customerData.due_date,
      rentalTotal,
      depositTotal,
      grandTotal,
      priceMode,
      selectedDays,
      JSON.stringify(products)
    ],
    (err, result) => {
      if (err) {
        console.log("Create Order Error:", err);
        return res.status(500).json({ message: "Insert failed" });
      }

      res.status(201).json({
        success: true,
        message: "Order saved successfully",
        orderId: result.insertId
      });
    }
  );
};


/* =======================================================
   GET ALL ORDERS
======================================================= */
export const getOrders = (req, res) => {
  db.query(
    "SELECT * FROM shop_order_history ORDER BY id DESC",
    (err, result) => {
      if (err) {
        console.log("Fetch Orders Error:", err);
        return res.status(500).json({ message: "Fetch failed" });
      }

      res.json(result);
    }
  );
};

/* =======================================================
   GET ORDER BY ID  (FOR RETURN PAGE)
======================================================= */
export const getOrderById = (req, res) => {
  const { id } = req.params;
  

  db.query(
    "SELECT * FROM shop_order_history WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log("Get Order Error:", err);
        return res.status(500).json({ message: "Server error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Order not found" });
      }

      const order = result[0];

      // ✅ SAFE JSON HANDLING (FIXED)
      let products = [];

      if (order.products_json) {
        if (typeof order.products_json === "string") {
          try {
            products = JSON.parse(order.products_json);
          } catch (e) {
            console.log("JSON Parse Error:", e);
            products = [];
          }
        } else if (typeof order.products_json === "object") {
          products = order.products_json;
        }
      }

      // ✅ Extract delivery & return date
      let deliveryDate = null;
      let returnDate = null;

      if (products.length > 0) {
        deliveryDate = products[0].start_date || null;
        returnDate = products[0].end_date || null;
      }

      // ✅ Final response
      res.json({
        id: order.id,
        customer_name: order.customer_name,
        phone: order.phone,
        address: order.address,
        advance_amount: order.advance_amount,
        due_amount: order.due_amount,
        grand_total: order.grand_total,
        delivery_date: deliveryDate,
        return_date: returnDate,
        due_date: order.due_date,
        price_mode: order.price_mode,
        selected_days: order.selected_days,
        items: products
      });
    }
  );
};
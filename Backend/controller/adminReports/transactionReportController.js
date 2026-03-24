import db from "../../config/db.js";

/* ===============================
   1. DAILY / WEEKLY / MONTHLY REPORT
=================================*/
export const getTransactionsReport = (req, res) => {

  const { startDate, endDate } = req.query;

  const sql = `
    SELECT 
      id,
      order_group_id,
      customer_name,
      product_name,
      grand_total,
      advance_amount,
      due_amount,
      payment_status,
      created_at
    FROM shop_checkout_new
    WHERE DATE(created_at) BETWEEN ? AND ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [startDate, endDate], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(result);

  });

};


/* ===============================
   2. PENDING PAYMENTS REPORT
=================================*/
export const getPendingPayments = (req, res) => {

  const sql = `
    SELECT 
      id,
      order_group_id,
      customer_name,
      product_name,
      grand_total,
      advance_amount,
      due_amount,
      due_date
    FROM shop_checkout_new
    WHERE due_amount > 0
    ORDER BY due_date ASC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(result);

  });

};


/* ===============================
   3. REFUND REPORT
=================================*/
export const getRefundsReport = (req, res) => {

  const sql = `
    SELECT 
      id,
      order_id,
      customer_name,
      product_name,
      rent_amount,
      deposit_amount,
      total_refund_amount,
      refund_method,
      reason,
      status,
      created_at
    FROM shop_returnlist_table
    WHERE status IN ('returned','cancelled')
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(result);

  });

};


/* ===============================
   4. ADVANCE & DEPOSIT REPORT
=================================*/
export const getAdvanceDepositReport = (req, res) => {

  const sql = `
    SELECT
      id,
      order_group_id,
      customer_name,
      product_name,
      advance_amount,
      deposit_total,
      payment_method,
      created_at
    FROM shop_checkout_new
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(result);

  });

};


/* ===============================
   5. INVOICE / BILL REPORT
=================================*/
export const getInvoice = (req, res) => {

  const orderId = req.params.orderGroupId;

  const sql = `
    SELECT 
      order_group_id,
      customer_name,
      phone,
      address,
      product_name,
      delivery_date,
      return_date,
      rental_total,
      deposit_total,
      grand_total,
      advance_amount,
      due_amount,
      payment_method,
      payment_status
    FROM shop_checkout_new
    WHERE order_group_id = ?
  `;

  db.query(sql, [orderId], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(result);

  });

};
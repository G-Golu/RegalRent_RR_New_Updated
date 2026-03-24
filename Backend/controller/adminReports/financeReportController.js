import db from "../../config/db.js";

export const getFinanceReport = (req, res) => {
  const query = `
    SELECT 
      c.total_orders,
      c.total_rental_income,
      c.total_advance_amount,
      c.total_deposit_amount,
      c.total_due_amount,
      r.total_refund_amount
    FROM
      (
        SELECT 
          COUNT(*) AS total_orders,
          IFNULL(SUM(rental_total),0) AS total_rental_income,
          IFNULL(SUM(advance_amount),0) AS total_advance_amount,
          IFNULL(SUM(deposit_total),0) AS total_deposit_amount,
          IFNULL(SUM(due_amount),0) AS total_due_amount
        FROM shop_checkout_new
      ) c
    CROSS JOIN
      (
        SELECT 
          IFNULL(SUM(total_refund_amount),0) AS total_refund_amount
        FROM shop_returnlist_table
        WHERE status = 'returned'
      ) r
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Finance Report Error:", err);
      return res.status(500).json({ message: "Server Error" });
    }

    console.log("FINAL FINANCE RESULT:", result[0]);
    res.status(200).json(result[0]);
  });
};
import db from "../../../config/db.js";

export const updatePaymentStatus = (req, res) => {

  const { orderId, paymentId } = req.body;

  if (!orderId || !paymentId) {
    return res.status(400).json({
      success: false,
      message: "Order ID or Payment ID missing"
    });
  }

  const query = `
    UPDATE shop_checkout_new
    SET 
      payment_status = 'success',
      payment_id = ?,
      status = 'confirmed'
    WHERE id = ?
  `;

  db.query(query, [paymentId, orderId], (err, result) => {
    if (err) {
      console.error("Payment Update Error:", err);
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment updated successfully"
    });
  });
};
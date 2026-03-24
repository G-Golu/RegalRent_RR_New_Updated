
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./shopReceipt.css";
import logo from "../../assets/images/logo.png";
import html2pdf from "html2pdf.js";

const ShopReceipt = () => {
  const { orderGroupId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/shop-checkout/${orderGroupId}`
        );
        setOrder(res.data);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setLoading(false);
      }
    };

    if (orderGroupId) fetchOrder();
  }, [orderGroupId]);

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "-";

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${d}-${m}-${y}`;
  };

  const handleDownload = () => {
    const element = document.querySelector(".receipt-card");

    const opt = {
      margin: 10,
      filename: `Invoice_${order.id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1.5, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(opt).save();
  };

  if (loading) return <h3>Loading...</h3>;
  if (!order) return <h3>No Order Found</h3>;

  // ================= CALCULATIONS =================

  const rentalTotal = order.products?.reduce(
    (sum, p) => sum + Number(p.rent_amount || 0),
    0
  );

  const depositTotal = order.products?.reduce(
    (sum, p) => sum + Number(p.deposit_amount || 0),
    0
  );

  const orderTotal = rentalTotal + depositTotal;

  const advancePaid = Number(order.advance_amount || 0);

  const finalDue = orderTotal - advancePaid;

  // =================================================

  return (
    <div className="receipt-wrapper">
      <div className="receipt-card">

        {/* HEADER */}
        <div className="receipt-header">
          <div className="shop-details">
            <img src={logo} alt="logo" />
            <h2>Regal Rentals</h2>
            <p>Near City Center, Ahmedabad</p>
            <p>Mobile: +91 12345 67890</p>
          </div>

          <div className="invoice-details">
            <h1>INVOICE</h1>
            <p><b>Bill No:</b> {order.id}</p>
            <p><b>Booking Date:</b> {formatDate(order.due_date)}</p>
          </div>
        </div>

        {/* BILL TO */}
        <div className="bill-to">
          <p><b>Bill To</b></p>
          <p>{order.customer_name}</p>
          <p>Mobile: {order.phone}</p>
          <p>Address: {order.address}</p>
        </div>

        {/* TABLE */}
        <table className="receipt-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Product</th>
              <th>Delivery</th>
              <th>Return</th>
              <th>Deposit (₹)</th>
              <th>Rental Price (₹)</th>
            </tr>
          </thead>

          <tbody>
            {order.products?.length > 0 ? (
              order.products.map((p, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{p.product_name}</td>
                  <td>{formatDate(p.delivery_date)}</td>
                  <td>{formatDate(p.return_date)}</td>
                  <td>₹{p.deposit_amount || 0}</td>
                  <td>₹{p.rent_amount || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* SUMMARY */}
        <div className="receipt-summary">
          <div>
            <span>Rental Total</span>
            <span>₹{rentalTotal}</span>
          </div>

          <div>
            <span>Deposit Total</span>
            <span>₹{depositTotal}</span>
          </div>

          <div>
            <span>Order Total (Rent + Deposit)</span>
            <span>₹{orderTotal}</span>
          </div>

          <div>
            <span>Advance Paid</span>
            <span>₹{advancePaid}</span>
          </div>

          <div className="total">
            <span>Final Due Payable</span>
            <span>₹{finalDue}</span>
          </div>
        </div>

        <div className="receipt-footer">
          Thank you for shopping with us <br />
          <small>Subject to Ahmedabad Jurisdiction</small>
        </div>
      </div>

      <div className="page-actions">
        <button className="download-btn" onClick={handleDownload}>
          ⬇ Download Invoice
        </button>

        <button
          className="my-orders-btn"
          onClick={() => navigate("/shop-admin/my-order-page")}
        >
          🏠 Go to My Orders
        </button>
      </div>
    </div>
  );
};

export default ShopReceipt;

// this is finall no need any change 100% correct
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createBookingApi } from "../../api/shopAdmin/shopProductBookApi.js";
import "../Orders/orderSummary.css";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // ✅ Receive all selected products
  const products = location.state?.products || [];

  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const todayDate = new Date().toLocaleString();

  // ✅ Calculate grand total
  const totalAmount = products.reduce(
    (sum, item) => sum + Number(item.total_amount || 0),
    0,
  );

  // ✅ Image handler
  const getImageUrl = (image) => {
    if (!image) return "/no-image.png";
    if (image.startsWith("http")) return image;
    return `http://localhost:5000/uploads/${image}`;
  };

  //  Cancel → Back to Cart
  const handleCancel = () => {
    navigate("/shop-admin/cart");
  };

  // Show confirmation popup
  const handleConfirm = () => {
    setShowConfirm(true);
  };

  //  Close popup
  const handleNo = () => {
    setShowConfirm(false);
  };

  const handleYes = async () => {
    try {
      setLoading(true);

      await Promise.all(
        products.map((item) =>
          createBookingApi({
            user_id: item.user_id,
            product_id: item.product_id || item.id,
            size: item.size,
            start_date: formatDate(item.start_date),
            end_date: formatDate(item.end_date),

            total_days: item.total_days,
            rent_amount: item.rent_amount,
            deposit_amount: item.deposit_amount,
            total_amount: item.total_amount,
          }),
        ),
      );

      setShowConfirm(false);

      alert("Order Confirmed Successfully!");

      navigate("/shop-admin/checkout", {
        state: {
          products: products.map((item) => ({
            ...item,
            product_id: item.product_id || item.id,
          })),
        },
      });
    } catch (error) {
      console.error(" FULL BOOKING ERROR:", error);

      if (error.response) {
        console.error("📦 Server Response Data:", error.response.data);
        console.error("📡 Status Code:", error.response.status);
      } else if (error.request) {
        console.error("📭 No response received:", error.request);
      } else {
        console.error("⚠️ Error Message:", error.message);
      }

      alert(error.response?.data?.message || "Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-page">
      <h2>Order Summary</h2>

      {products.length === 0 ? (
        <p>No products selected , please select product</p>
      ) : (
        <>
          {products.map((item) => (
            <div key={item.id} className="order-card">
              <div className="order-img">
                <img src={getImageUrl(item.image)} alt={item.name} />
              </div>

              <div className="order-details">
                <h3>{item.name}</h3>
                <p>
                  <strong>Code:</strong> {item.code}
                </p>
                <p>
                  <strong>Color:</strong> {item.color}
                </p>
                <p>
                  <strong>Size:</strong> {item.size}
                </p>

                <p>
                  <strong>Start Date:</strong>{" "}
                  {item.start_date?.substring(0, 10)}
                </p>

                <p>
                  <strong>End Date:</strong> {item.end_date?.substring(0, 10)}
                </p>
                <p>
                  <strong>Total Days:</strong> {item.total_days}
                </p>
                <p>
                  <strong>Order Date:</strong> {todayDate}
                </p>
                <p className="price">
                  <strong>Total:</strong> ₹{item.total_amount}
                </p>
              </div>
            </div>
          ))}

          <div className="order-summary">
            <h3>Grand Total: ₹{totalAmount.toFixed(2)}</h3>

            <div className="order-buttons">
              <button
                className="cancel-btn"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Order"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ✅ Confirm Popup */}
      {showConfirm && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Are You Sure You Want to Confirm?</h3>

            <div className="popup-buttons">
              <button
                className="yes-btn"
                onClick={handleYes}
                disabled={loading}
              >
                {loading ? "Please Wait..." : "Yes"}
              </button>

              <button className="no-btn" onClick={handleNo} disabled={loading}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;

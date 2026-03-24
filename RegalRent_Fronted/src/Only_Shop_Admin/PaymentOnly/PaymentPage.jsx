import { useLocation, useNavigate } from "react-router-dom";
import "./payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const products = location.state?.products || [];

  const totalAmount = products.reduce(
    (sum, item) => sum + Number(item.total_amount || 0),
    0
  );

  const handlePayment = () => {
    alert("Payment Successful!");
    navigate("/shop-admin/checkout");
  };

  return (
    <div className="payment-page">
      <h2>Payment</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <>
          <div className="payment-summary">
            {products.map((item) => (
              <div key={item.id} className="payment-item">
                <h3>{item.name}</h3>
                <p>Amount: ₹{item.total_amount}</p>
              </div>
            ))}

            <h3 className="grand-total">
              Grand Total: ₹{totalAmount.toFixed(2)}
            </h3>
          </div>

          <div className="payment-buttons">
            <button
              className="cancel-btn"
              onClick={() => navigate("/shop-admin/cart")}
            >
              Cancel
            </button>

            <button className="pay-btn" onClick={handlePayment}>
              Pay Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Payment;

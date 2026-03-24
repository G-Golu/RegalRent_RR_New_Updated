import { useEffect, useState } from "react";
import axios from "axios";
import { createBookingApi } from "../../api/shopAdmin/shopProductBookApi.js";
import "../../Only_User/pages/userhome.css";

const UserHome = () => {
  const [products, setProducts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  /* ================= FETCH PRODUCTS ================= */

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/shop_product");
      setProducts(res.data);
    } catch (error) {
      console.error("Product fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ================= BOOK PRODUCT ================= */

  const handleBook = async (product) => {
    try {
      const bookingData = {
        product_id: product.id,
        user_id: user.id,
        customer_name: user.name,
        start_date: "2026-03-15",
        end_date: "2026-03-18",
        total_days: 3,
        rent_amount: product.rent_price,
        deposit_amount: product.deposit_price,
        total_amount: product.rent_price * 3,
        size: product.size || "M",
      };

      const res = await createBookingApi(bookingData);

      alert(res.data.message);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed");
    }
  };

  return (
    <div className="user-home">
      <h2 className="page-title">Available Clothes</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="img-box">
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x300";
                }}
              />
            </div>

            <div className="product-info">
              <h3>{product.name}</h3>

              <p className="rent">
                Rent: <span>₹{product.rent_price}</span>
              </p>

              <p className="deposit">
                Deposit: <span>₹{product.deposit_price}</span>
              </p>

              <button
                className="book-btn"
                onClick={() => handleBook(product)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHome;
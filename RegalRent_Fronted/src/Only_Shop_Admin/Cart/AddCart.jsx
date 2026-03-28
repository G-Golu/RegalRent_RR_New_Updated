

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartApi, removeCartApi } from "../../api/shopAdmin/shopCartApi.js";
import "./cart.css";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  /* ================= LOAD CART ================= */
const loadCart = async () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    const res = await getCartApi(userId);
    const cartData = res.data || [];

    setCartItems(cartData);
    setSelectedItems([]);

    window.dispatchEvent(new Event("cartUpdated"));

  } catch (error) {
    console.error("Load Cart Error:", error);
  }
};
  /* ================= REMOVE ITEM ================= */
const removeItem = async (id) => {
  try {
    await removeCartApi(id);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    const res = await getCartApi(userId);
    const updatedCart = res.data || [];

    setCartItems(updatedCart);
    setSelectedItems([]);

    window.dispatchEvent(new Event("cartUpdated"));

  } catch (error) {
    console.error("Remove Error:", error);
  }
};
  /* ================= USE EFFECT ================= */

  useEffect(() => {
    loadCart();
  }, []);

  /* ================= SELECT LOGIC ================= */

  const toggleSelect = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const selectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((_, i) => i));
    }
  };

  /* ================= TOTAL AMOUNT ================= */

  const totalAmount = cartItems.reduce((sum, item, index) => {
    if (!selectedItems.includes(index)) return sum;
    return sum + Number(item.total_amount || 0);
  }, 0);

  /* ================= PROCESS ORDER ================= */

  const handleProcessOrder = () => {
    const selectedProducts = cartItems.filter((_, index) =>
      selectedItems.includes(index)
    );

    if (selectedProducts.length === 0) {
      alert("Please select at least one product");
      return;
    }

    navigate("/shop-admin/order-page", {
      state: { products: selectedProducts },
    });
  };

  /* ================= IMAGE URL ================= */

  const getImageUrl = (image) => {
    if (!image) return "/no-image.png";
    if (image.startsWith("http")) return image;
    return `http://localhost:5000/uploads/${image}`;
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>🛒 My Cart</h2>

        <button className="select-all-btn" onClick={selectAll}>
          {selectedItems.length === cartItems.length
            ? "Unselect All"
            : "Select All"}
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-cart">No items in cart</p>
      ) : (
        <div className="cart-layout">

          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div
                key={item.id || item._id}
                className={`cart-card ${
                  selectedItems.includes(index) ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(index)}
                  onChange={() => toggleSelect(index)}
                />

                <div className="cart-image">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                  />
                </div>

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>Code: {item.code}</p>
                  <p>Color: {item.color}</p>
                  <p>Size: {item.size}</p>
                  <p>Days: {item.total_days}</p>

                  <p className="price">₹{item.total_amount}</p>

                  {item.quantity && (
                    <p>Quantity: {item.quantity}</p>
                  )}
                </div>

                <div className="cart-actions">
                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(item.id || item._id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div>
              <h3>Total Amount</h3>
              <h3>Rs: {totalAmount.toFixed(2)}</h3>
            </div>

            <button
              className="process-btn"
              onClick={handleProcessOrder}
            >
              Process Order
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

 export default AddToCart;
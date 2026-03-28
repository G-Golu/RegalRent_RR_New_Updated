import { useEffect, useState } from "react";
import {
  getWishlistApi,
  removeWishlistApi
} from "../../api/shopAdmin/wishlist/wishlistApi.js";
import "./wishlist.css";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  /* ================= LOAD WISHLIST ================= */
  const loadWishlist = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser?.id) return;

      const res = await getWishlistApi(storedUser.id);
console.log("API RESPONSE:", res.data);
console.log("WISHLIST:", res.data.wishlist);
      setWishlistItems(res.data.wishlist || []);

    } catch (error) {
      console.error("Wishlist load error:", error);
    }
  };

  /* ================= REMOVE ================= */
  const removeItem = async (id) => {
    try {
      await removeWishlistApi(id);

      // 🔥 reload after delete
      loadWishlist();

      // 🔥 update header badge
      window.dispatchEvent(new Event("wishlistUpdated"));

    } catch (error) {
      console.error("Remove error:", error);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  return (
    <div className="crmsWishlist-wrapper">

      {/* HEADER */}
      <div className="crmsWishlist-header">
        <h2>❤️ My Wishlist</h2>
        <span>{wishlistItems.length} items</span>
      </div>

      {/* EMPTY */}
      {wishlistItems.length === 0 ? (
        <div className="crmsWishlist-empty">
          <h3>Your wishlist is empty</h3>
          <p>Add items you love to see them here.</p>
        </div>
      ) : (

        <div className="crmsWishlist-grid">

          {wishlistItems.map((item) => (
            <div key={item.id} className="crmsWishlist-card">

              {/* IMAGE */}
              <div className="crmsWishlist-img">
                <img
                  src={
                    item.image
                      ? `http://localhost:5000/uploads/${item.image}`
                      : "/no-image.png"
                  }
                  alt={item.name}
                />
              </div>

              {/* INFO */}
              <div className="crmsWishlist-info">

                <h3 className="crmsWishlist-name">
                  {item.name}
                </h3>

                <p className="crmsWishlist-price">
                  ₹{item.rent_price}
                </p>

                <div className="crmsWishlist-actions">

                  <button
                    className="crmsWishlist-removeBtn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default WishlistPage;
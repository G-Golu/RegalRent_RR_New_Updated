import { useEffect, useState } from "react";
import "../wishlist/wishlist.css";

const WishlistPage = () => {

  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlistItems(storedWishlist);
  }, []);

  const removeItem = (id) => {
    const updated = wishlistItems.filter(item => item.id !== id);

    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="wishlist-container">

      <div className="wishlist-header">
        <h2>❤️ My Wishlist</h2>
        <span>{wishlistItems.length} items</span>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <h3>Your wishlist is empty</h3>
          <p>Add items you love to see them here.</p>
        </div>
      ) : (

        <div className="wishlist-grid">

          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-card">

              <div className="wishlist-img">
                <img
                  src={item.image || "/no-image.png"}
                  alt={item.name}
                />
              </div>

              <div className="wishlist-info">

                <h3 className="wishlist-name">
                  {item.name}
                </h3>

                <p className="wishlist-price">
                  ₹{item.price}
                </p>

                <div className="wishlist-actions">

                  <button
                    className="wishlist-remove"
                    onClick={() => removeItem(item.id)}
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
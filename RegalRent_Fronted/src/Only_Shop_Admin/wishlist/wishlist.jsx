import { useEffect, useState } from "react";
import "./wishlist.css";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedWishlist);
  }, []);



const removeItem = (id) => {
  setWishlistItems((prev) => {
    const updated = prev.filter(
      (item) => String(item.id) !== String(id)
    );

    localStorage.setItem("wishlist", JSON.stringify(updated));

    return updated;
  });
};




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
                  src={item.image || "/no-image.png"}
                  alt={item.name}
                />
              </div>

              {/* INFO */}
              <div className="crmsWishlist-info">

                <h3 className="crmsWishlist-name">
                  {item.name}
                </h3>

                <p className="crmsWishlist-price">
                  ₹{item.price}
                </p>

                <div className="crmsWishlist-actions">

                  <button
  className="crmsWishlist-removeBtn"
  onClick={(e) => {
    e.stopPropagation();   //  VERY IMPORTANT
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


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { fetchProducts } from "../../api/shopAdmin/shopProductApi.js";
// import { addToCartApi } from "../../api/shopAdmin/shopCartApi.js";
// import "./productbook.css";

// const Productbook = () => {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;

//   const [size, setSize] = useState("");
//   const [bookedRanges, setBookedRanges] = useState([]);
//   const [showCalendar, setShowCalendar] = useState(false);

//   /* LOAD PRODUCTS */
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const res = await fetchProducts();
//         const activeProducts = (res.data || []).filter(
//           (item) => item.status === "active"
//         );
//         setProducts(activeProducts);
//       } catch (error) {
//         console.error("Product load error:", error);
//       }
//     };
//     loadProducts();
//   }, []);

  

//   /* LOAD BOOKED RANGES */
// const loadBookedDates = async (productId, selectedSize) => {
//   try {
//     const res = await axios.get(
//       `http://localhost:5000/api/shop-admin/bookings/booked-dates/${productId}?size=${selectedSize}`
//     );

//     let ranges = [];
//     (res.data || []).forEach((booking) => {
//       const start = new Date(booking.start_date + "T00:00:00");
//       const end = new Date(booking.end_date + "T00:00:00");
//       ranges.push({ start, end });
//     });

//     setBookedRanges(ranges);

//   } catch (error) {
//     console.error("Booked dates error:", error);
//     setBookedRanges([]);
//   }
// };

// /* HANDLE DATE CHANGE */
// const handleDateChange = (update) => {
//   const [start, end] = update;

//   if (start && !end) {
//     setDateRange([start, null]);
//     return;
//   }

//   if (start && end) {
//     const isOverlapping = bookedRanges.some((range) => {
//       return start <= range.end && end >= range.start;
//     });

//     if (isOverlapping) {
//       alert("Selected dates overlap with existing booking");
//       return;
//     }

//     setDateRange([start, end]);
//   }
// };



//   /* GET DAY CLASSNAME FOR GREEN/RED DATES */
//   const getDayClassName = (date) => {
//     const isBooked = bookedRanges.some(
//       (range) => date >= range.start && date <= range.end
//     );
//     return isBooked ? "booked-day" : "available-day";
//   };

//   const formatDate = (date) => {
//     if (!date) return "";
//     return date.toLocaleDateString("en-GB");
//   };

//   const filteredProducts = products.filter((p) =>
//     p.code?.toLowerCase().includes(search.toLowerCase())
//   );


// const handleAddToCart = async () => {
//   if (!selectedProduct) return;
//   if (!size) return alert("Please select size");
//   if (!startDate || !endDate) return alert("Please select booking dates");

//   const formatLocalDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const calculateDays = (start, end) => {
//     const s = new Date(start);
//     const e = new Date(end);
//     s.setHours(0, 0, 0, 0);
//     e.setHours(0, 0, 0, 0);
//     const diff = e.getTime() - s.getTime();
//     return diff / (1000 * 60 * 60 * 24) + 1;
//   };

//   try {
//     const startStr = formatLocalDate(startDate);
//     const endStr = formatLocalDate(endDate);
//     const totalDays = calculateDays(startDate, endDate);

//     const rent = Number(selectedProduct.rent_price);
//     const deposit = Number(selectedProduct.deposit_price);
//     const totalPayable = rent + deposit;

//     const today = formatLocalDate(new Date());

//     await addToCartApi({
//       user_id: 1,
//       product_id: selectedProduct.id,
//       size,
//       start_date: startStr,
//       end_date: endStr,
//       total_days: totalDays,
//       rent_amount: rent,
//       deposit_amount: deposit,
//       total_amount: totalPayable,
//       added_date: today,
//     });

//     alert("Added To Cart Successfully!");

//     setDateRange([null, null]);
//     setShowCalendar(false);
//     setSize("");
//     setSelectedProduct(null);
//   } catch (error) {
//     console.error(error);
//     alert(error.response?.data?.message || "Error adding to cart");
//   }
// };






//   return (
//     <div className="catalogue-page">
//       <div className="catalogue-container">
//         <h3>Products Catalogue</h3>

//         <div className="filters">
//           <input
//             placeholder="Search Code..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <div className="catalogue-grid">
//           {filteredProducts.map((item) => (
//             <div key={item.id} className="catalogue-item">
//               <img
//                 src={
//                   item.image
//                     ? `http://localhost:5000/uploads/${item.image}`
//                     : "https://via.placeholder.com/300"
//                 }
//                 alt={item.code}
//               />
//               <div className="item-footer">
//                 <div>
//                   <strong>{item.code}</strong>
//                   <div>₹{item.rent_price}/day</div>
//                 </div>
//                 <button
//                   className="btn-primary"
//                   onClick={() => {
//                     setSelectedProduct(item);
//                     setDateRange([null, null]);
//                     setSize("");
//                     setBookedRanges([]);
//                     setShowCalendar(false);
//                   }}
//                 >
//                   View
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {selectedProduct && (
//         <div className="modal-overlay">
//           <div className="modal-card">
//             <img
//               src={
//                 selectedProduct.image
//                   ? `http://localhost:5000/uploads/${selectedProduct.image}`
//                   : "https://via.placeholder.com/300"
//               }
//               alt=""
//             />

//             <h3>{selectedProduct.code}</h3>
//             <p>
//               <b>Name:</b> {selectedProduct.name}
//             </p>
//             <p>
//               <b>Rent:</b> ₹{selectedProduct.rent_price} / day
//             </p>
//             <p>
//               <b>Deposit:</b> ₹{selectedProduct.deposit_price}
//             </p>

//             <div className="sizes">
//               {["Free", "XS", "S", "M", "L", "XL", "XXL"].map((s) => (
//                 <button
//                   key={s}
//                   className={`size-btn ${size === s ? "active" : ""}`}
//                   onClick={() => {
//                     setSize(s);
//                     loadBookedDates(selectedProduct.id, s);
//                   }}
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>

//             <button
//               className="btn-primary"
//               disabled={!size}
//               onClick={() => setShowCalendar(!showCalendar)}
//             >
//               Select Dates
//             </button>

//             {showCalendar && (
//               <DatePicker
//                 selectsRange
//                 startDate={startDate}
//                 endDate={endDate}
//                 onChange={handleDateChange}
//                 inline
//                 minDate={new Date()}
//                 filterDate={(date) =>
//                   !bookedRanges.some(
//                     (range) => date >= range.start && date <= range.end
//                   )
//                 }
//                 dayClassName={getDayClassName}
//               />
//             )}

//             {startDate && endDate && (
//               <p className="selected-range">
//                 {formatDate(startDate)} to {formatDate(endDate)}
//               </p>
//             )}

//             <button className="btn-primary full" onClick={handleAddToCart}>
//               Add To Cart
//             </button>

//             <button
//               className="close-btn"
//               onClick={() => setSelectedProduct(null)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Productbook;

// all good  comment for only add wishlist icon -- today is : 12-03-2026








// =================================gooding



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { fetchProducts } from "../../api/shopAdmin/shopProductApi.js";
// import { addToCartApi } from "../../api/shopAdmin/shopCartApi.js";
// import { Heart } from "lucide-react";
// import "./productbook.css";

// const Productbook = () => {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;

//   const [size, setSize] = useState("");
//   const [bookedRanges, setBookedRanges] = useState([]);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [wishlist, setWishlist] = useState([]);

//   /* LOAD PRODUCTS */
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const res = await fetchProducts();
//         const activeProducts = (res.data || []).filter(
//           (item) => item.status === "active"
//         );
//         setProducts(activeProducts);
//       } catch (error) {
//         console.error("Product load error:", error);
//       }
//     };
//     loadProducts();
//   }, []);

//   /* LOAD WISHLIST */
// useEffect(() => {
//   const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//   setWishlist(storedWishlist);
// }, []);




// /* TOGGLE WISHLIST */
// const toggleWishlist = (product) => {
//   const exists = wishlist.find((item) => item.id === product.id);

//   let updated;

//   if (exists) {
//     updated = wishlist.filter((item) => item.id !== product.id);
//     alert("Removed from Wishlist");
//   } else {
//     updated = [
//       ...wishlist,
//       {
//         id: product.id,
//         name: product.name,
//         price: product.rent_price,
//         image: product.image
//           ? `http://localhost:5000/uploads/${product.image}`
//           : "",
//       },
//     ];
//     alert("Added to Wishlist ❤️");
//   }

//   setWishlist(updated);
//   localStorage.setItem("wishlist", JSON.stringify(updated));

//   window.dispatchEvent(new Event("wishlistUpdated"));
// };
  

//   /* LOAD BOOKED RANGES */
// const loadBookedDates = async (productId, selectedSize) => {
//   try {
//     const res = await axios.get(
//       `http://localhost:5000/api/shop-admin/bookings/booked-dates/${productId}?size=${selectedSize}`
//     );

//     let ranges = [];
//     (res.data || []).forEach((booking) => {
//       const start = new Date(booking.start_date + "T00:00:00");
//       const end = new Date(booking.end_date + "T00:00:00");
//       ranges.push({ start, end });
//     });

//     setBookedRanges(ranges);

//   } catch (error) {
//     console.error("Booked dates error:", error);
//     setBookedRanges([]);
//   }
// };

// /* HANDLE DATE CHANGE */
// const handleDateChange = (update) => {
//   const [start, end] = update;

//   if (start && !end) {
//     setDateRange([start, null]);
//     return;
//   }

//   if (start && end) {
//     const isOverlapping = bookedRanges.some((range) => {
//       return start <= range.end && end >= range.start;
//     });

//     if (isOverlapping) {
//       alert("Selected dates overlap with existing booking");
//       return;
//     }

//     setDateRange([start, end]);
//   }
// };



//   /* GET DAY CLASSNAME FOR GREEN/RED DATES */
//   const getDayClassName = (date) => {
//     const isBooked = bookedRanges.some(
//       (range) => date >= range.start && date <= range.end
//     );
//     return isBooked ? "booked-day" : "available-day";
//   };

//   const formatDate = (date) => {
//     if (!date) return "";
//     return date.toLocaleDateString("en-GB");
//   };

//   const filteredProducts = products.filter((p) =>
//     p.code?.toLowerCase().includes(search.toLowerCase())
//   );


// const handleAddToCart = async () => {
//   if (!selectedProduct) return;
//   if (!size) return alert("Please select size");
//   if (!startDate || !endDate) return alert("Please select booking dates");

//   const formatLocalDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const calculateDays = (start, end) => {
//     const s = new Date(start);
//     const e = new Date(end);
//     s.setHours(0, 0, 0, 0);
//     e.setHours(0, 0, 0, 0);
//     const diff = e.getTime() - s.getTime();
//     return diff / (1000 * 60 * 60 * 24) + 1;
//   };

//   try {
//     const startStr = formatLocalDate(startDate);
//     const endStr = formatLocalDate(endDate);
//     const totalDays = calculateDays(startDate, endDate);

//     const rent = Number(selectedProduct.rent_price);
//     const deposit = Number(selectedProduct.deposit_price);
//     const totalPayable = rent + deposit;

//     const today = formatLocalDate(new Date());

//     await addToCartApi({
//       user_id: 1,
//       product_id: selectedProduct.id,
//       size,
//       start_date: startStr,
//       end_date: endStr,
//       total_days: totalDays,
//       rent_amount: rent,
//       deposit_amount: deposit,
//       total_amount: totalPayable,
//       added_date: today,
//     });
// window.dispatchEvent(new Event("cartUpdated")); 
//     alert("Added To Cart Successfully!");

//     setDateRange([null, null]);
//     setShowCalendar(false);
//     setSize("");
//     setSelectedProduct(null);
//   } catch (error) {
//     console.error(error);
//     alert(error.response?.data?.message || "Error adding to cart");
//   }
// };






//   return (
//     <div className="catalogue-page">
//       <div className="catalogue-container">
//         <h3>Products Catalogue</h3>

//         <div className="filters">
//           <input
//             placeholder="Search Code..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <div className="catalogue-grid">
//           {filteredProducts.map((item) => (
//             <div key={item.id} className="catalogue-item">

//   <div
//     className="wishlist-icon"
//     onClick={() => toggleWishlist(item)}
//   >
//     <Heart
//       size={18}
//       fill={wishlist.some((w) => w.id === item.id) ? "#ff4d6d" : "none"}
//       color={wishlist.some((w) => w.id === item.id) ? "#ff4d6d" : "#555"}
//     />
//   </div>

//   <img
//                 src={
//                   item.image
//                     ? `http://localhost:5000/uploads/${item.image}`
//                     : "https://via.placeholder.com/300"
//                 }
//                 alt={item.code}
//               />
//               <div className="item-footer">
//                 <div>
//                   <strong>{item.code}</strong>
//                   <div>₹{item.rent_price}/day</div>
//                 </div>
//                 <button
//                   className="btn-primary"
//                   onClick={() => {
//                     setSelectedProduct(item);
//                     setDateRange([null, null]);
//                     setSize("");
//                     setBookedRanges([]);
//                     setShowCalendar(false);
//                   }}
//                 >
//                   View
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {selectedProduct && (
//         <div className="modal-overlay">
//           <div className="modal-card">
//             <img
//               src={
//                 selectedProduct.image
//                   ? `http://localhost:5000/uploads/${selectedProduct.image}`
//                   : "https://via.placeholder.com/300"
//               }
//               alt=""
//             />

//             <h3>{selectedProduct.code}</h3>
//             <p>
//               <b>Name:</b> {selectedProduct.name}
//             </p>
//             <p>
//               <b>Rent:</b> ₹{selectedProduct.rent_price} / day
//             </p>
//             <p>
//               <b>Deposit:</b> ₹{selectedProduct.deposit_price}
//             </p>

//             <div className="sizes">
//               {["Free", "XS", "S", "M", "L", "XL", "XXL"].map((s) => (
//                 <button
//                   key={s}
//                   className={`size-btn ${size === s ? "active" : ""}`}
//                   onClick={() => {
//                     setSize(s);
//                     loadBookedDates(selectedProduct.id, s);
//                   }}
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>

//             <button
//               className="btn-primary"
//               disabled={!size}
//               onClick={() => setShowCalendar(!showCalendar)}
//             >
//               Select Dates
//             </button>

//             {showCalendar && (
//               <DatePicker
//                 selectsRange
//                 startDate={startDate}
//                 endDate={endDate}
//                 onChange={handleDateChange}
//                 inline
//                 minDate={new Date()}
//                 filterDate={(date) =>
//                   !bookedRanges.some(
//                     (range) => date >= range.start && date <= range.end
//                   )
//                 }
//                 dayClassName={getDayClassName}
//               />
//             )}

//             {startDate && endDate && (
//               <p className="selected-range">
//                 {formatDate(startDate)} to {formatDate(endDate)}
//               </p>
//             )}

//             <button className="btn-primary full" onClick={handleAddToCart}>
//               Add To Cart
//             </button>

//             <button
//               className="close-btn"
//               onClick={() => setSelectedProduct(null)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Productbook;

// all ok comment for update cart page api 28-03-2026













import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchProducts } from "../../api/shopAdmin/shopProductApi.js";
import { addToCartApi } from "../../api/shopAdmin/shopCartApi.js";
import { Heart } from "lucide-react";
import "./productbook.css";
import { getWishlistApi, addWishlistApi, removeWishlistApi } from "../../api/shopAdmin/wishlist/wishlistApi.js";






const Productbook = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [size, setSize] = useState("");
  const [bookedRanges, setBookedRanges] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  /* LOAD PRODUCTS */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts();
        const activeProducts = (res.data || []).filter(
          (item) => item.status === "active"
        );
        setProducts(activeProducts);
      } catch (error) {
        console.error("Product load error:", error);
      }
    };
    loadProducts();
  }, []);

  /* LOAD WISHLIST */
// useEffect(() => {
//   const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//   setWishlist(storedWishlist);
// }, []);


useEffect(() => {
  const loadWishlist = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?.id) return;

    const res = await getWishlistApi(storedUser.id);
    setWishlist(res.data.wishlist || []);
  };

  loadWishlist();

  window.addEventListener("wishlistUpdated", loadWishlist);
  return () => window.removeEventListener("wishlistUpdated", loadWishlist);
}, []);









/* TOGGLE WISHLIST */
/* TOGGLE WISHLIST */
const toggleWishlist = async (product) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser?.id) {
    alert("Please login first");
    return;
  }

  try {
    // 🔍 check if already in wishlist (DB data)
    const exists = wishlist.find(
      (item) => item.product_id === product.id
    );

    if (exists) {
      // 🔥 REMOVE (use wishlist table id)
      await removeWishlistApi(exists.id);
      alert("Removed from Wishlist ❌");
    } else {
      // 🔥 ADD to DB
      await addWishlistApi({
        user_id: storedUser.id,
        product_id: product.id,
      });
      alert("Added to Wishlist ❤️");
    }

    // 🔥 reload real data from backend
    window.dispatchEvent(new Event("wishlistUpdated"));

  } catch (error) {
    console.error("Wishlist error:", error);
  }
};
  

  /* LOAD BOOKED RANGES */
const loadBookedDates = async (productId, selectedSize) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/shop-admin/bookings/booked-dates/${productId}?size=${selectedSize}`
    );

    let ranges = [];
    (res.data || []).forEach((booking) => {
      const start = new Date(booking.start_date + "T00:00:00");
      const end = new Date(booking.end_date + "T00:00:00");
      ranges.push({ start, end });
    });

    setBookedRanges(ranges);

  } catch (error) {
    console.error("Booked dates error:", error);
    setBookedRanges([]);
  }
};

/* HANDLE DATE CHANGE */
const handleDateChange = (update) => {
  const [start, end] = update;

  if (start && !end) {
    setDateRange([start, null]);
    return;
  }

  if (start && end) {
    const isOverlapping = bookedRanges.some((range) => {
      return start <= range.end && end >= range.start;
    });

    if (isOverlapping) {
      alert("Selected dates overlap with existing booking");
      return;
    }

    setDateRange([start, end]);
  }
};



  /* GET DAY CLASSNAME FOR GREEN/RED DATES */
  const getDayClassName = (date) => {
    const isBooked = bookedRanges.some(
      (range) => date >= range.start && date <= range.end
    );
    return isBooked ? "booked-day" : "available-day";
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB");
  };

  const filteredProducts = products.filter((p) =>
    p.code?.toLowerCase().includes(search.toLowerCase())
  );


// const handleAddToCart = async () => {
//   if (!selectedProduct) return;
//   if (!size) return alert("Please select size");
//   if (!startDate || !endDate) return alert("Please select booking dates");

//   const formatLocalDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const calculateDays = (start, end) => {
//     const s = new Date(start);
//     const e = new Date(end);
//     s.setHours(0, 0, 0, 0);
//     e.setHours(0, 0, 0, 0);
//     const diff = e.getTime() - s.getTime();
//     return diff / (1000 * 60 * 60 * 24) + 1;
//   };

//   try {
//     const startStr = formatLocalDate(startDate);
//     const endStr = formatLocalDate(endDate);
//     const totalDays = calculateDays(startDate, endDate);

//     const rent = Number(selectedProduct.rent_price);
//     const deposit = Number(selectedProduct.deposit_price);
//     const totalPayable = rent + deposit;

//     const today = formatLocalDate(new Date());

//     await addToCartApi({
//       user_id: 1,
//       product_id: selectedProduct.id,
//       size,
//       start_date: startStr,
//       end_date: endStr,
//       total_days: totalDays,
//       rent_amount: rent,
//       deposit_amount: deposit,
//       total_amount: totalPayable,
//       added_date: today,
//     });
// window.dispatchEvent(new Event("cartUpdated")); 
//     alert("Added To Cart Successfully!");

//     setDateRange([null, null]);
//     setShowCalendar(false);
//     setSize("");
//     setSelectedProduct(null);
//   } catch (error) {
//     console.error(error);
//     alert(error.response?.data?.message || "Error adding to cart");
//   }
// };



const handleAddToCart = async () => {
  if (!selectedProduct) return;
  if (!size) return alert("Please select size");
  if (!startDate || !endDate) return alert("Please select booking dates");

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser?.id) {
    alert("Please login first");
    return;
  }

  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const calculateDays = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    s.setHours(0, 0, 0, 0);
    e.setHours(0, 0, 0, 0);
    const diff = e.getTime() - s.getTime();
    return diff / (1000 * 60 * 60 * 24) + 1;
  };

  try {
    const startStr = formatLocalDate(startDate);
    const endStr = formatLocalDate(endDate);
    const totalDays = calculateDays(startDate, endDate);

    const rent = Number(selectedProduct.rent_price);
    const deposit = Number(selectedProduct.deposit_price);
    const totalPayable = rent + deposit;

    const today = formatLocalDate(new Date());

    await addToCartApi({
      user_id: storedUser.id,   // 🔥 FINAL FIX
      product_id: selectedProduct.id,
      size,
      start_date: startStr,
      end_date: endStr,
      total_days: totalDays,
      rent_amount: rent,
      deposit_amount: deposit,
      total_amount: totalPayable,
      added_date: today,
    });

    window.dispatchEvent(new Event("cartUpdated"));

    alert("Added To Cart Successfully!");

    setDateRange([null, null]);
    setShowCalendar(false);
    setSize("");
    setSelectedProduct(null);

  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Error adding to cart");
  }
};











  return (
    <div className="catalogue-page">
      <div className="catalogue-container">
        <h3>Products Catalogue</h3>

        <div className="filters">
          <input
            placeholder="Search Code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="catalogue-grid">
          {filteredProducts.map((item) => (
            <div key={item.id} className="catalogue-item">

  <div
    className="wishlist-icon"
    onClick={() => toggleWishlist(item)}
  >
    <Heart
      size={18}
      fill={wishlist.some((w) => w.product_id === item.id)? "#ff4d6d" : "none"}
      color={wishlist.some((w) => w.product_id === item.id) ? "#ff4d6d" : "#555"}
    />
  </div>

  <img
                src={
                  item.image
                    ? `http://localhost:5000/uploads/${item.image}`
                    : "https://via.placeholder.com/300"
                }
                alt={item.code}
              />
              <div className="item-footer">
                <div>
                  <strong>{item.code}</strong>
                  <div>₹{item.rent_price}/day</div>
                </div>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setSelectedProduct(item);
                    setDateRange([null, null]);
                    setSize("");
                    setBookedRanges([]);
                    setShowCalendar(false);
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-card">
            <img
              src={
                selectedProduct.image
                  ? `http://localhost:5000/uploads/${selectedProduct.image}`
                  : "https://via.placeholder.com/300"
              }
              alt=""
            />

            <h3>{selectedProduct.code}</h3>
            <p>
              <b>Name:</b> {selectedProduct.name}
            </p>
            <p>
              <b>Rent:</b> ₹{selectedProduct.rent_price} / day
            </p>
            <p>
              <b>Deposit:</b> ₹{selectedProduct.deposit_price}
            </p>

            <div className="sizes">
              {["Free", "XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                <button
                  key={s}
                  className={`size-btn ${size === s ? "active" : ""}`}
                  onClick={() => {
                    setSize(s);
                    loadBookedDates(selectedProduct.id, s);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              className="btn-primary"
              disabled={!size}
              onClick={() => setShowCalendar(!showCalendar)}
            >
              Select Dates
            </button>

            {showCalendar && (
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                inline
                minDate={new Date()}
                filterDate={(date) =>
                  !bookedRanges.some(
                    (range) => date >= range.start && date <= range.end
                  )
                }
                dayClassName={getDayClassName}
              />
            )}

            {startDate && endDate && (
              <p className="selected-range">
                {formatDate(startDate)} to {formatDate(endDate)}
              </p>
            )}

            <button className="btn-primary full" onClick={handleAddToCart}>
              Add To Cart
            </button>

            <button
              className="close-btn"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productbook;
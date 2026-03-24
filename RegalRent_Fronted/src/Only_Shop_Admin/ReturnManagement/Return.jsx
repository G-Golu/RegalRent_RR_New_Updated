// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "../ReturnManagement/return.css";
// import axios from "axios";
// import { createReturn } from "../../api/shopAdmin/Return/shopReturnApi";

// const ReturnPage = () => {
//   const { orderId } = useParams();

//   const [order, setOrder] = useState(null);
//   const [reason, setReason] = useState("");
//   const [note, setNote] = useState("");
//   const [refundMethod, setRefundMethod] = useState("original");
//   const [loading, setLoading] = useState(false);
//   const [pageLoading, setPageLoading] = useState(true);

//   //  NEW STATES
//   const [returnDate, setReturnDate] = useState("");
//   const [condition, setCondition] = useState("Good");

//  useEffect(() => {
//   const loadOrder = async () => {
//     try {
//       if (!orderId) {
//         setPageLoading(false);
//         return;
//       }

//       // Store last visited return order
//       localStorage.setItem("lastReturnOrderId", orderId);

//       const res = await axios.get("http://localhost:5000/api/checkout/list");
//       const allOrders = res.data.data || [];

//       const selectedOrder = allOrders.find(
//         (item) => item.id === parseInt(orderId)
//       );

//       setOrder(selectedOrder || null);
//     } catch (error) {
//       console.error("Order fetch error:", error);
//       alert("Failed to load order");
//     } finally {
//       setPageLoading(false);
//     }
//   };

//   loadOrder();
// }, [orderId]);

//   if (pageLoading) return <div>Loading...</div>;
//   if (!order) return <div>Order not found</div>;

//   // 🔹 Map product(s)
//   const products =
//     order.items ||
//     order.products ||
//     (order.product_id
//       ? [
//           {
//             id: order.product_id,
//             product_name: order.product_name,
//             deposit_amount: Number(order.deposit_amount ?? 0),
//             rent_amount: Number(order.rent_amount ?? 0),
//             return_date: order.return_date,
//             days: order.days ?? 1,
//           },
//         ]
//       : []);

//   // ================= CALCULATIONS =================

//   const calculateLateDays = () => {
//     if (!returnDate || !products[0]?.return_date) return 0;

//     const due = new Date(products[0].return_date);
//     const returned = new Date(returnDate);

//     const diffTime = returned - due;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     return diffDays > 0 ? diffDays : 0;
//   };

//   const lateDays = calculateLateDays();
//   const lateCharges = lateDays * 20;

//   const getDamageCharges = () => {
//     if (condition === "Good") return 0;
//     if (condition === "Minor Damage") return 50;
//     if (condition === "Major Damage") return 100;
//     return 0;
//   };

//   const damageCharges = getDamageCharges();

//   const totalDeposit = products.reduce(
//     (sum, p) => sum + Number(p.deposit_amount || 0),
//     0,
//   );

//   const finalRefund =
//     totalDeposit - lateCharges - damageCharges > 0
//       ? totalDeposit - lateCharges - damageCharges
//       : 0;

//   // ================= SUBMIT =================

//   const handleSubmit = async () => {
//     if (!reason) return alert("Please select return reason");
//     if (!returnDate) return alert("Please select actual return date");

//     setLoading(true);

//     try {
//       const payload = {
//         order_id: order.id,
//         customer_name: order.customer_name || "Unknown",
//         reason,
//         note,
//         refund_method: refundMethod,

//         return_date: returnDate,
//          actual_return_date: returnDate,
//         condition,
//         late_days: lateDays,
        
//         late_charges: lateCharges,
//         damage_charges: damageCharges,
//         final_refund: finalRefund,

//        products: products.map((p) => ({
//   product_id: p.id,
//   product_name: p.product_name ?? p.name ?? "Unknown Product", //  ADD THIS
//   deposit_amount: Number(p.deposit_amount ?? 0),
//   rent_amount: Number(p.rent_amount ?? 0),
//   days: Number(p.days ?? 1),
//   return_date: p.return_date,
// })),
//       };

//       const res = await createReturn(payload);

//       if (res.success) {
//          // ✅ FREE BOOKING DATE
// await axios.post(
//   "http://localhost:5000/api/shop-admin/bookings/complete-return",
//   {
//     order_id: order.id,
//     product_id: products[0].id,
//     actual_return_date: returnDate
//   }
// );


//         alert("Return submitted successfully!");
//         window.location.href = "/shop-admin/return-list";
//       } else {
//         alert(res.message || "Failed to submit return");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error submitting return");
//     } finally {
//       setLoading(false);
//     }
//   };


//   // ================= UI =================

//   return (
//     <div className="return-page">
//       <div className="return-container">
//         <h2 className="return-title">Return Request - Order #{order.id}</h2>

//         {/* PRODUCT TABLE */}
//         <div className="product-table">
//           <h3>Products to Return</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Select</th>
//                 <th>Product</th>
//                 <th>Return Date</th>
//                 <th>Days</th>
//                 <th>Deposit</th>
//                 <th>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" style={{ textAlign: "center" }}>
//                     No Products Found
//                   </td>
//                 </tr>
//               ) : (
//                 products.map((item, index) => {
//                   const productName = item.product_name ?? item.name ?? "N/A";

//                   const deposit = Number(item.deposit_amount ?? 0);
//                   const rental = Number(item.rent_amount ?? 0);
//                   const total = deposit + rental;

//                   const endDate = item.return_date
//                     ? item.return_date.substring(0, 10)
//                     : "N/A";

//                   return (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" defaultChecked />
//                       </td>
//                       <td>{productName}</td>
//                       <td>{endDate}</td>
//                       <td>{item.days ?? 1}</td>
//                       <td>Rs. {deposit.toFixed(2)}</td>
//                       <td>Rs. {total.toFixed(2)}</td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* CUSTOMER INFO */}
//         <div className="customer-form">
//           <h3>Customer Information</h3>
//           <input value={order.customer_name || ""} disabled />
//           <input value={order.phone || ""} disabled />
//           <input value={order.address || ""} disabled />
//           <input value={`Order ID: ${order.id}`} disabled />
//         </div>

//         {/* RETURN SECTION */}
//         <div className="return-section">
//           <h3>Return Reason</h3>

//           <select value={reason} onChange={(e) => setReason(e.target.value)}>
//             <option value="">Select Reason</option>
//             <option value="damaged">Product Damaged</option>
//             <option value="wrong">Wrong Item Delivered</option>
//             <option value="quality">Quality Not Satisfied</option>
//           </select>

//           <textarea
//             placeholder="Additional Notes"
//             value={note}
//             onChange={(e) => setNote(e.target.value)}
//           />

//           <label>Actual Return Date</label>
//           <input
//             type="date"
//             value={returnDate}
//             onChange={(e) => setReturnDate(e.target.value)}
//           />

//           <label>Product Condition</label>
//           <select
//             value={condition}
//             onChange={(e) => setCondition(e.target.value)}
//           >
//             <option>Good</option>
//             <option>Minor Damage</option>
//             <option>Major Damage</option>
//           </select>
//         </div>

//         {/* REFUND METHOD */}
//         <div className="bottom-section">
//           <div className="refund-section">
//             <h3>Refund Method</h3>
//             <div className="refund-options">
//               <div
//                 className={`refund-card ${
//                   refundMethod === "original" ? "active" : ""
//                 }`}
//                 onClick={() => setRefundMethod("original")}
//               >
//                 <div className="refund-left">
//                   <div className="refund-icon">💳</div>
//                   <div>
//                     <p className="refund-title">Original Payment</p>
//                     <span className="refund-desc">
//                       Refund to original payment method
//                     </span>
//                   </div>
//                 </div>
//                 <input
//                   type="radio"
//                   checked={refundMethod === "original"}
//                   readOnly
//                 />
//               </div>

//               <div
//                 className={`refund-card ${
//                   refundMethod === "cash" ? "active" : ""
//                 }`}
//               onClick={() => setRefundMethod("cash")}
//               >
//                 <div className="refund-left">
//                   <div className="refund-icon">💵</div>
//                   <div>
//                     <p className="refund-title">Cash</p>
//                     <span className="refund-desc">Refund as cash payment</span>
//                   </div>
//                 </div>
//                 <input
//                   type="radio"
//                   checked={refundMethod === "cash"}
//                   readOnly
//                 />
//               </div>
//             </div>
//           </div>

//           {/* REFUND SUMMARY */}
//           <div className="return-summary">
//             <h3>Refund Summary</h3>

//             <div className="summary-row">
//               <span>Total Deposit</span>
//               <span>Rs. {totalDeposit.toFixed(2)}</span>
//             </div>

//             <div className="summary-row">
//               <span>Late Days</span>
//               <span>{lateDays}</span>
//             </div>

//             <div className="summary-row">
//               <span>Late Charges (₹20/day)</span>
//               <span>Rs. {lateCharges.toFixed(2)}</span>
//             </div>

//             <div className="summary-row">
//               <span>Damage Charges</span>
//               <span>Rs. {damageCharges.toFixed(2)}</span>
//             </div>

//             <div className="summary-divider"></div>

//             <div className="summary-row total">
//               <span>Final Refund</span>
//               <span>Rs. {finalRefund.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         <button
//           className="submit-return-btn"
//           onClick={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Submit Return Request"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReturnPage;


// all correct now today is : 13-03-2026






















import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../ReturnManagement/return.css";
import axios from "axios";
import { createReturn } from "../../api/shopAdmin/Return/shopReturnApi";

const ReturnPage = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [refundMethod, setRefundMethod] = useState("original");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  //  NEW STATES
  // const [returnDate, setReturnDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
const [returnDate, _setReturnDate] = useState(today);
  const [condition, setCondition] = useState("Good");

 useEffect(() => {
  const loadOrder = async () => {
    try {
      if (!orderId) {
        setPageLoading(false);
        return;
      }

      // Store last visited return order
      localStorage.setItem("lastReturnOrderId", orderId);

      const res = await axios.get("http://localhost:5000/api/checkout/list");
      const allOrders = res.data.data || [];

      const selectedOrder = allOrders.find(
        (item) => item.id === parseInt(orderId)
      );

      setOrder(selectedOrder || null);
    } catch (error) {
      console.error("Order fetch error:", error);
      alert("Failed to load order");
    } finally {
      setPageLoading(false);
    }
  };

  loadOrder();
}, [orderId]);

  if (pageLoading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;

  // 🔹 Map product(s)
  const products =
    order.items ||
    order.products ||
    (order.product_id
      ? [
          {
            id: order.product_id,
            product_name: order.product_name,
            deposit_amount: Number(order.deposit_amount ?? 0),
            rent_amount: Number(order.rent_amount ?? 0),
            return_date: order.return_date,
            days: order.days ?? 1,
          },
        ]
      : []);

  // ================= CALCULATIONS =================

  const calculateLateDays = () => {
    if (!returnDate || !products[0]?.return_date) return 0;

    const due = new Date(products[0].return_date);
    const returned = new Date(returnDate);

    const diffTime = returned - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  const lateDays = calculateLateDays();
  const lateCharges = lateDays * 20;

  const getDamageCharges = () => {
    if (condition === "Good") return 0;
    if (condition === "Minor Damage") return 50;
    if (condition === "Major Damage") return 100;
    return 0;
  };

  const damageCharges = getDamageCharges();

  const totalDeposit = products.reduce(
    (sum, p) => sum + Number(p.deposit_amount || 0),
    0,
  );

  const finalRefund =
    totalDeposit - lateCharges - damageCharges > 0
      ? totalDeposit - lateCharges - damageCharges
      : 0;

  // ================= SUBMIT =================

  const handleSubmit = async () => {
    if (!reason) return alert("Please select return reason");
    if (!returnDate) return alert("Please select actual return date");

    setLoading(true);

    try {
      const payload = {
        order_id: order.id,
        customer_name: order.customer_name || "Unknown",
        reason,
        note,
        refund_method: refundMethod,

        return_date: returnDate,
         actual_return_date: returnDate,
        condition,
        late_days: lateDays,
        
        late_charges: lateCharges,
        damage_charges: damageCharges,
        final_refund: finalRefund,

       products: products.map((p) => ({
  product_id: p.id,
  product_name: p.product_name ?? p.name ?? "Unknown Product", //  ADD THIS
  deposit_amount: Number(p.deposit_amount ?? 0),
  rent_amount: Number(p.rent_amount ?? 0),
  days: Number(p.days ?? 1),
  return_date: p.return_date,
})),
      };

      const res = await createReturn(payload);

      if (res.success) {
         // ✅ FREE BOOKING DATE
await axios.post(
  "http://localhost:5000/api/shop-admin/bookings/complete-return",
  {
    order_id: order.id,
    product_id: products[0].id,
    actual_return_date: returnDate
  }
);


        alert("Return submitted successfully!");
        window.location.href = "/shop-admin/return-list";
      } else {
        alert(res.message || "Failed to submit return");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting return");
    } finally {
      setLoading(false);
    }
  };


  // ================= UI =================

  return (
    <div className="return-page">
      <div className="return-container">
        <h2 className="return-title">Last Return Request - Order #{order.id}</h2>

        {/* PRODUCT TABLE */}
        <div className="product-table">
          <h3>Products to Return</h3>
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Product</th>
                <th>Return Date</th>
                <th>Days</th>
                <th>Deposit</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No Products Found
                  </td>
                </tr>
              ) : (
                products.map((item, index) => {
                  const productName = item.product_name ?? item.name ?? "N/A";

                  const deposit = Number(item.deposit_amount ?? 0);
                  const rental = Number(item.rent_amount ?? 0);
                  const total = deposit + rental;

                  const endDate = item.return_date
                    ? item.return_date.substring(0, 10)
                    : "N/A";

                  return (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" defaultChecked />
                      </td>
                      <td>{productName}</td>
                      <td>{endDate}</td>
                      <td>{item.days ?? 1}</td>
                      <td>Rs. {deposit.toFixed(2)}</td>
                      <td>Rs. {total.toFixed(2)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* CUSTOMER INFO */}
        <div className="customer-form">
          <h3>Customer Information</h3>
          <input value={order.customer_name || ""} disabled />
          <input value={order.phone || ""} disabled />
          <input value={order.address || ""} disabled />
          <input value={`Order ID: ${order.id}`} disabled />
        </div>

        {/* RETURN SECTION */}
        <div className="return-section">
          <h3>Return Reason</h3>

          <select value={reason} onChange={(e) => setReason(e.target.value)}>
            <option value="">Select Reason</option>
            <option value="damaged">Product Damaged</option>
            <option value="wrong">Wrong Item Delivered</option>
            <option value="quality">Quality Not Satisfied</option>
          </select>

          <textarea
            placeholder="Additional Notes"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <label>Actual Return Date</label>
          {/* <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          /> */}
{/* for calender block , return date */}
    <input
  type="date"
  value={today}
  readOnly
/>

          <label>Product Condition</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option>Good</option>
            <option>Minor Damage</option>
            <option>Major Damage</option>
          </select>
        </div>

        {/* REFUND METHOD */}
        <div className="bottom-section">
          <div className="refund-section">
            <h3>Refund Method</h3>
            <div className="refund-options">
              <div
                className={`refund-card ${
                  refundMethod === "original" ? "active" : ""
                }`}
                onClick={() => setRefundMethod("original")}
              >
                <div className="refund-left">
                  <div className="refund-icon">💳</div>
                  <div>
                    <p className="refund-title">Original Payment</p>
                    <span className="refund-desc">
                      Refund to original payment method
                    </span>
                  </div>
                </div>
                <input
                  type="radio"
                  checked={refundMethod === "original"}
                  readOnly
                />
              </div>

              <div
                className={`refund-card ${
                  refundMethod === "cash" ? "active" : ""
                }`}
              onClick={() => setRefundMethod("cash")}
              >
                <div className="refund-left">
                  <div className="refund-icon">💵</div>
                  <div>
                    <p className="refund-title">Cash</p>
                    <span className="refund-desc">Refund as cash payment</span>
                  </div>
                </div>
                <input
                  type="radio"
                  checked={refundMethod === "cash"}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* REFUND SUMMARY */}
          <div className="return-summary">
            <h3>Refund Summary</h3>

            <div className="summary-row">
              <span>Total Deposit</span>
              <span>Rs. {totalDeposit.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Late Days</span>
              <span>{lateDays}</span>
            </div>

            <div className="summary-row">
              <span>Late Charges (₹20/day)</span>
              <span>Rs. {lateCharges.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Damage Charges</span>
              <span>Rs. {damageCharges.toFixed(2)}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Final Refund</span>
              <span>Rs. {finalRefund.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          className="submit-return-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit Return Request"}
        </button>
      </div>
    </div>
  );
};

export default ReturnPage;




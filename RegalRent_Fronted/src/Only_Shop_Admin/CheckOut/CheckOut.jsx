
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createCheckoutApi } from "../../api/shopAdmin/Checkout/checkoutApi.js"; // Should save to shop_checkout_new
import { getStaff } from "../../api/shopAdmin/staffApi.js";

import "./checkOut.css";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const products = location.state?.products || [];

  const [loading, setLoading] = useState(false);

  // ================= CUSTOMER STATE =================
  const [customerData, setCustomerData] = useState({
    customer_name: "",
    phone: "",
    alt_phone: "",
    email: "",
    address: "",
    id_type: "",
    id_number: "",
    note: "",
    advance_amount: "",
    due_date: ""
  });

  // ================= STAFF STATE =================
  const [staffList, setStaffList] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);

  // ================= PRICING MODE =================
  const [priceMode, setPriceMode] = useState("day");

  // ================= FETCH STAFF =================
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await getStaff();
        const staffArray =
          res?.data?.data ||
          res?.data?.staff ||
          res?.data?.result ||
          res?.data ||
          [];
        setStaffList(Array.isArray(staffArray) ? staffArray : []);
      } catch (error) {
        console.error("Staff fetch error:", error);
        setStaffList([]);
      }
    };
    fetchStaff();
  }, []);

  // ================= CALCULATE DAYS =================
  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 1;
    const [sy, sm, sd] = startDate.split("T")[0].split("-");
    const [ey, em, ed] = endDate.split("T")[0].split("-");
    const start = new Date(sy, sm - 1, sd);
    const end = new Date(ey, em - 1, ed);
    const diffTime = end - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 1;
  };

  const formatDate = (date) => new Date(date).toLocaleDateString("en-IN");

  // ================= CALCULATE TOTALS =================
  const rentalTotal = products.reduce((sum, item) => {
    const rent = Number(item.rent_amount || 0);
    const days = calculateDays(item.start_date, item.end_date);
    return priceMode === "day" ? sum + rent * days : sum + rent;
  }, 0);

  const depositTotal = products.reduce(
    (sum, item) => sum + Number(item.deposit_amount || 0),
    0
  );

  const grandTotal = rentalTotal + depositTotal;
  const advanceAmount = Number(customerData.advance_amount || 0);
  const dueAmount = Math.max(grandTotal - advanceAmount, 0);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "advance_amount" && Number(value) < 0) return;
    setCustomerData({ ...customerData, [name]: value });
  };

  // ================= HANDLE STAFF =================
  const handleStaffChange = (e) => {
    const staffId = e.target.value;
    setSelectedStaffId(staffId);
    const staff = staffList.find(
      (s) => String(s.id) === staffId || String(s.staff_id) === staffId
    );
    setSelectedStaff(staff || null);
  };

  // ================= VALIDATION =================
  const validateForm = () => {
    if (!customerData.customer_name.trim()) return alert("Customer Name required");
    if (!customerData.phone.trim()) return alert("Phone required");
    if (!customerData.address.trim()) return alert("Address required");
    if (!customerData.id_type) return alert("Select ID Type");
    if (!customerData.id_number.trim()) return alert("Enter ID Number");
    if (!selectedStaffId) return alert("Select Staff");
    if (!customerData.due_date) return alert("Select Due Date");
    if (advanceAmount > grandTotal) return alert("Advance cannot exceed total");
    return true;
  };

 // ================= SAVE ORDER =================
const handlePlaceOrder = async () => {
  if (!validateForm()) return;

  try {
    setLoading(true);

    // Prepare products array
    const rows = products.map((item) => ({
      product_id: item.product_id || item.id,
      product_name: item.name,
      delivery_date: item.start_date?.split("T")[0] || null,
      return_date: item.end_date?.split("T")[0] || null,
      rent_amount: item.rent_amount ?? 0,
      deposit_amount: item.deposit_amount ?? 0
    }));

    // Call backend API
    const res = await createCheckoutApi({
      products: rows,
      pricing_type: priceMode,
      rental_total: rentalTotal,
      deposit_total: depositTotal,
      grand_total: grandTotal,
      advance_amount: advanceAmount,
      due_amount: dueAmount,
      due_date: customerData.due_date,
      note: customerData.note,
      payment_status: "NOT PAID", // direct save
      customer: {
        customer_name: customerData.customer_name,
        phone: customerData.phone,
        alt_phone: customerData.alt_phone,
        email: customerData.email, // include email
        address: customerData.address,
        id_type: customerData.id_type,
        id_number: customerData.id_number
      },
      staff: {
        staff_id: selectedStaffId,
        staff_name: selectedStaff?.name || "",
        staff_mobile: selectedStaff?.number || ""
      }
    });

    // ✅ Successfully saved
    alert("Order Saved Successfully");

    const orderGroupId = res.data.orderGroupId;

    // Navigate to invoice page with full order data
    navigate(`/shop-admin/shop-order/${orderGroupId}`, {
      state: {
        orderData: {
          orderGroupId,
          products: rows,
          customer: {
            customer_name: customerData.customer_name,
            phone: customerData.phone,
            alt_phone: customerData.alt_phone,
            email: customerData.email,
            address: customerData.address,
            id_type: customerData.id_type,
            id_number: customerData.id_number
          },
          staff: {
            staff_id: selectedStaffId,
            staff_name: selectedStaff?.name || "",
            staff_mobile: selectedStaff?.number || ""
          },
          totals: {
            rentalTotal,
            depositTotal,
            grandTotal,
            advanceAmount,
            dueAmount,
          },
          note: customerData.note,
        }
      }
    });

  } catch (error) {
    console.error("CHECKOUT ERROR:", error);
    alert("Save Failed");
  } finally {
    setLoading(false);
  }
};

  // ================= NO PRODUCTS =================
  if (!products.length) {
    return (
      <div className="checkout-page">
        <h2>No Products Selected</h2>
        <button onClick={() => navigate("/shop-admin/cart")}>Back to Cart</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2 className="checkout-title">Checkout Form</h2>

        {/* Product Table */}
        <div className="product-table">
          <table>
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Product Name</th>
                <th>Delivery Date</th>
                <th>Return Date</th>
                <th>Rental</th>
                <th>Deposit</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => {
                const rent = Number(item.rent_amount || 0);
                const deposit = Number(item.deposit_amount || 0);
                const days = calculateDays(item.start_date, item.end_date);
                const total = rent * days;
                return (
                  <tr key={item.id || index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{formatDate(item.start_date)}</td>
                    <td>{formatDate(item.end_date)}</td>
                    <td>{priceMode === "day" ? `Rs. ${rent} × ${days} = Rs. ${total}` : `Fixed Price = Rs. ${rent}`}</td>
                    <td>Rs.{deposit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Customer Form */}
        <div className="customer-form">
          <h3>Customer Details</h3>
          <input name="customer_name" placeholder="Customer Name" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="alt_phone" placeholder="Alternate Phone" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <textarea name="address" placeholder="Address" onChange={handleChange} />
          <select name="id_type" onChange={handleChange}>
            <option value="">Select ID Type</option>
            <option>PAN Card</option>
            <option>Aadhar Card</option>
            <option>Driving Licence</option>
            <option>Passport</option>
          </select>
          <input name="id_number" placeholder="ID Number" onChange={handleChange} />
        </div>

        {/* Staff Section */}
        <div className="staff-section">
          <h3 className="section-title">Staff Details</h3>
          <select value={selectedStaffId} onChange={handleStaffChange}>
            <option value="">Select Staff</option>
            {staffList.map((staff) => (
              <option key={staff.id || staff.staff_id} value={staff.id || staff.staff_id}>
                {staff.name || "Unnamed Staff"}
              </option>
            ))}
          </select>
          {selectedStaff && (
            <div className="staff-details-card">
              <div className="staff-row">
                <span className="staff-label">Staff ID</span>
                <span className="staff-value">{selectedStaff.staff_code || selectedStaff.staff_id || "-"}</span>
              </div>
              <div className="staff-row">
                <span className="staff-label">Name</span>
                <span className="staff-value">{selectedStaff.name || "-"}</span>
              </div>
              <div className="staff-row">
                <span className="staff-label">Mobile</span>
                <span className="staff-value">{selectedStaff.number || "-"}</span>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Type */}
        <div className="pricing-section">
          <h3>Pricing Type</h3>
          <label>
            <input type="radio" checked={priceMode === "day"} onChange={() => setPriceMode("day")} /> Day Based Price
          </label>
          <label>
            <input type="radio" checked={priceMode === "fixed"} onChange={() => setPriceMode("fixed")} /> Fixed Price
          </label>
        </div>

        {/* Payment Summary */}
        <div className="payment-summary">
          <h3>Payment Summary</h3>
          <p><strong>Total Rental : Rs.{rentalTotal}</strong></p>
          <p>Deposit Total : Rs.{depositTotal}</p>
          <p><strong>Grand Total : Rs.{grandTotal}</strong></p>
          <input type="number" name="advance_amount" placeholder="Advance Amount" onChange={handleChange} />
          <p>Due Amount : Rs.{dueAmount}</p>
          <input type="date" name="due_date" onChange={handleChange} />
          <textarea name="note" placeholder="Note" onChange={handleChange} />
        </div>

        {/* Save Order Button */}
        <button
          type="button"
          className="place-order-btn"
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Order"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
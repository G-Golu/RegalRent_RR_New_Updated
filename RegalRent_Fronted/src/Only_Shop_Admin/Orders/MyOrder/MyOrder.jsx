
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../MyOrder/myOrder.css";

const MyOrderPage = ({ autoNavigateLatest }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState("");   // add for search bar
  const navigate = useNavigate();

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/checkout/list");
      const orderData = res.data.data || res.data;
      setOrders(orderData);

      // If autoNavigateLatest = true, go to latest order
      if (autoNavigateLatest && orderData.length > 0) {
        const latestOrder = orderData[orderData.length - 1];
        navigate(`/shop-admin/return/${latestOrder.id}`);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleReturn = (orderId) => {
    navigate(`/shop-admin/return/${orderId}`);

  };



//  FILTER LOGIC
  const filteredOrders = orders.filter((order) =>
    order.id.toString().includes(searchTerm) ||
    order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );




  if (loading) return <p>Loading...</p>;

  if (!loading && orders.length === 0) return <p>No Orders Found</p>;

  return (
    <div className="my-order-page">


      {/* HEADER WITH SEARCH */}
       <div className="order-header">
      <h2>My Orders</h2>


<input
          type="text"
          placeholder="Search by Order ID / Customer"
          className="order-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>



      <div className="table-wrapper">
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Customer</th>
              <th>Rental Price</th>
              <th>Deposit</th>
              <th>Delivery Date</th>
              <th>Return Date</th>
              <th>Staff ID</th>
              <th>Staff Name</th>
              <th>Advance</th>
              <th>Total</th>
              <th>Return</th>
            </tr>
          </thead>
          <tbody>
               {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.product_id}</td>
                <td>{order.product_name}</td>
                <td>{order.customer_name}</td>
                <td>₹{order.rent_amount}</td>
                <td>₹{order.deposit_amount}</td>
                <td>{order.delivery_date?.split("T")[0]}</td>
                <td>{order.return_date?.split("T")[0]}</td>
                <td>{order.staff_id}</td>
                <td>{order.staff_name}</td>
                <td>₹{order.advance_amount}</td>
                <td>₹{order.grand_total}</td>
                <td>
                  <button
                    className="return-btn"
                    onClick={() => handleReturn(order.id)}
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default MyOrderPage;

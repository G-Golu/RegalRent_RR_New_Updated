import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrdersApi } from "../../api/shopAdmin/OrderHistory/orderHistoryApi.js";
import "../OrderHistory/orderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const res = await getOrdersApi();
    setOrders(res.data);
  };

  return (
    <div className="order-history-container">
      <h2 className="history-title">Shop Order History</h2>

      <div className="table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Grand Total</th>
              <th>Advance</th>
              <th>Due</th>
              <th>Date</th>
              <th>Return</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customer_name}</td>
                <td>{o.phone}</td>
                <td>₹{o.grand_total}</td>
                <td>₹{o.advance_amount}</td>
                <td className="due-amount">₹{o.due_amount}</td>
                <td>{o.created_at?.slice(0, 10)}</td>
                <td>
                  <Link
                    to={`/shop-admin/return/${o.id}`}
                    className="return-link"
                  >
                    Return
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default OrderHistory;

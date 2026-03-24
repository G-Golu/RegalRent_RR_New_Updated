import { useEffect, useState } from "react";
import axios from "axios";

const UserOrderBox = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/orders/users")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="order-box user-box">
      <h2>👤 User Orders (Direct)</h2>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.order_code}>
              <td>{o.order_code}</td>
              <td>{o.user_name}</td>
              <td>{o.product_name}</td>
              <td>{o.quantity}</td>
              <td>₹{o.total_amount}</td>
              <td>
                <span className={`status ${o.order_status.toLowerCase()}`}>
                  {o.order_status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrderBox;

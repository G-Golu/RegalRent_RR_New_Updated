import { useEffect, useState } from "react";
import axios from "axios";

const ShopAdminOrderBox = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/orders/shops")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="order-box shop-box">
      <h2>🏪 Shop-Admin Orders (Membership)</h2>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Shop</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Discount</th>
            <th>Final Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.order_code}>
              <td>{o.order_code}</td>
              <td>{o.shop_name}</td>
              <td>{o.product_name}</td>
              <td>{o.quantity}</td>
              <td>{o.discount_percent}%</td>
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

export default ShopAdminOrderBox;

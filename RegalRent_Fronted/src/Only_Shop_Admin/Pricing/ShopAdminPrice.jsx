import "./price.css";

const ShopPrice = () => {
  return (
    <div className="pricing-container">
      <h1 className="pricing-title">Our Pricing Plans</h1>
      <p className="pricing-subtitle">
        Choose the perfect plan for your shopping needs
      </p>

      <div className="pricing-cards">

        {/* Basic Plan */}
        <div className="pricing-card">
          <h2>Basic</h2>
          <p className="price">₹499<span>/month</span></p>
          <ul>
            <li>✔ Access to basic products</li>
            <li>✔ Standard Support</li>
            <li>✔ 5% Discount on Orders</li>
            <li>✖ Free Delivery</li>
          </ul>
          <button className="btn">Choose Plan</button>
        </div>

        {/* Standard Plan */}
        <div className="pricing-card popular">
          <div className="badge">Most Popular</div>
          <h2>Standard</h2>
          <p className="price">₹999<span>/month</span></p>
          <ul>
            <li>✔ Access to all products</li>
            <li>✔ Priority Support</li>
            <li>✔ 10% Discount on Orders</li>
            <li>✔ Free Delivery</li>
          </ul>
          <button className="btn primary-btn">Choose Plan</button>
        </div>

        {/* Premium Plan */}
        <div className="pricing-card">
          <h2>Premium</h2>
          <p className="price">₹1999<span>/month</span></p>
          <ul>
            <li>✔ Unlimited Products Access</li>
            <li>✔ 24/7 Dedicated Support</li>
            <li>✔ 20% Discount on Orders</li>
            <li>✔ Free Express Delivery</li>
          </ul>
          <button className="btn">Choose Plan</button>
        </div>

      </div>
    </div>
  );
};

export default ShopPrice;
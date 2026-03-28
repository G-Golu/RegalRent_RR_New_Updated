
const Footer = () => {
  return (
    <footer className="premium-footer">

      <div className="footer-container">

        {/* ABOUT */}
        <div className="footer-brand" id="about">
          <h2><i>RegalRent</i></h2>
          <p>
            Luxury clothing rentals for weddings, parties & special moments.
          </p>
        </div>

        {/* FEATURES */}
        <div className="footer-section" id="features">
          <h4>Features</h4>
          <ul>
            <li>Designer Clothing</li>
            <li>Flexible Rentals</li>
            <li>Premium Quality</li>
          </ul>
        </div>

        {/* TECHNOLOGY */}
        <div className="footer-section" id="technology">
          <h4>Technology</h4>
          <ul>
            <li>React js Frontend</li>
            <li>Node.js Backend</li>
            <li>MySql Database</li>
          </ul>
        </div>

        {/* TEAM */}
        <div className="footer-section" id="team">
          <h4>Our Team</h4>
          <ul>
            <li>Design Experts</li>
            <li>Fashion Stylists</li>
            <li>Customer Support</li>
          </ul>
        </div>

        {/* CUSTOMER */}
        <div className="footer-section" id="customer">
          <h4>Customer</h4>
          <ul>
            <li>Testimonials</li>
            <li>Customer Stories</li>
            <li>Community</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-section" id="contact">
          <h4>Contact</h4>
          <p>📧 support@regalrent.com</p>
          <p>📞 +91-8292735400 , +91-7370099784</p>

          <div className="social-icons">
            <span>🌐</span>
            <span>📸</span>
            <span>🐦</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 RegalRent. Crafted with elegance ✨</p>
      </div>

    </footer>
  );
};

export default Footer;
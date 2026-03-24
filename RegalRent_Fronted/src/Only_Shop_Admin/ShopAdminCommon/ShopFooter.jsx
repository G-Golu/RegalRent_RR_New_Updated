import "../../Only_Shop_Admin/ShopAdminCommon/shopFooter.css";

const ShopAdminFooter = () => {
  return (
    <footer className="admin-footer">
      <div className="footer-left">
        © {new Date().getFullYear()} Regal Rentals • All rights reserved
      </div>

      <div className="footer-center">
        Version 1.0.0
      </div>

      <div className="footer-right">
        <span className="status-dot"></span>
        System Online
      </div>
    </footer>
  );
};

export default ShopAdminFooter;

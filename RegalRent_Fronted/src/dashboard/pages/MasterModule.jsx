

import "./MasterModule.css";

const MasterModule = () => {
  return (
    <div className="product-wrapper">

      {/* ================= TOP SECTION ================= */}
      <div className="product-page">

        {/* LEFT : IMAGE PREVIEW */}
        <div className="image-card">
          <div className="image-main">
            <div className="placeholder">917 × 1000</div>
          </div>

          <div className="image-thumbs">
            <div className="thumb">917 × 1000</div>
            <div className="thumb">917 × 1000</div>
            <div className="thumb"></div>
          </div>
        </div>

        {/* RIGHT : BRAND + SERVICES */}
        <div className="side-panel">
          <div className="card">
            <h2>Brand</h2>

            <label className="checkbox"><input type="checkbox" /> Raymond</label>
            <label className="checkbox"><input type="checkbox" /> Pepe-Jeans</label>
            <label className="checkbox"><input type="checkbox" /> Celio</label>
            <label className="checkbox"><input type="checkbox" defaultChecked /> aime</label>
            <label className="checkbox"><input type="checkbox" defaultChecked /> aliff</label>
          </div>

          <div className="card service-card">
            <div className="service">
              <span className="icon">🚚</span>
              <div>
                <h4>Free Shipping</h4>
                <p>Free Shipping World Wide</p>
              </div>
            </div>

            <div className="service">
              <span className="icon">🕒</span>
              <div>
                <h4>24 X 7 Service</h4>
                <p>Online Service For New Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PRODUCT DETAILS ================= */}
      <div className="details-card">

        <div className="details-header">
          <h1>Women white top</h1>
          <span className="rating">★★★★★ <small>(250 review)</small></span>
        </div>

        <div className="price">
          <span className="new">$100</span>
          <span className="old">$350.00</span>
        </div>

        <div className="colors">
          <span className="color c1"></span>
          <span className="color c2"></span>
          <span className="color c3"></span>
          <span className="color c4"></span>
          <span className="color c5"></span>
        </div>

        <button className="buy-btn">🛒 Buy Now</button>

        <p className="desc">
          Rock Paper Scissors Various Dots Half Sleeves Girl’s Regular Fit T-Shirt |
          100% Cotton T Shirt with Half Sleeve Round Neck.
        </p>

        <div className="meta">
          <div>
            <p><b>Availability :</b> <span className="green">In stock</span></p>
            <p><b>Brand :</b> Pixelstrap</p>
          </div>
          <div>
            <p><b>Seller :</b> ABC</p>
            <p><b>Fabric :</b> Cotton</p>
          </div>
        </div>

        <div className="share">
          <b>Share It</b>
          <div className="icons">
            <span>f</span><span>G+</span><span>🐦</span><span>📷</span><span>📡</span>
          </div>
        </div>

        <div className="actions">
          <button className="cart">🛒 Add to Cart</button>
          <button className="wish">❤ Add To WishList</button>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="tabs">
        <span className="/dashboard/master-module/fabric">FABRIC</span>
        <span className="/dashboard/master-module/video">VIDEO</span>
        <span className="/dashboard/master-module/details">DETAILS</span>
        <span className="/dashboard/master-module/brand">BRAND</span>
      </div>

    </div>
  );
};

export default MasterModule;

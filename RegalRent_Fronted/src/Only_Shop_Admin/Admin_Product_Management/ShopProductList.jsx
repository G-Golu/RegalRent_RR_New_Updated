import { useEffect, useState } from "react";
import { fetchProducts } from "../../api/shopAdmin/shopProductApi";
import "./ShopProductList.css";
import { Link } from "react-router-dom";




const ShpPrdList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  // ✅ LOAD ONLY ACTIVE PRODUCTS
  const loadProducts = async () => {
    try {
      const res = await fetchProducts();

      const activeProducts = (res.data || []).filter(
        (item) => item.status === "active"
      );

      setProducts(activeProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ SEARCH FILTER
  const filteredData = products.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="product-list-page">
      {/* HEADER */}
      <div className="list-header">
        <h2 className="page-title">
          Product List ({filteredData.length})
        </h2>

        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="loading-text">Loading data...</p>
      ) : (
        <div className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Code</th>
                <th>Name</th>
                <th>SubCategory</th>
                <th>MRP</th>
                <th>Rent</th>
                <th>Deposit</th>
                <th>Stock</th>
                <th>Color</th>
                <th>Size</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                   {/* use for code linkable made */}
                   <td>
  <Link
    to={`/shop-admin/product-book/${item.id}`}
    className="product-book"
  >
    {item.code}
  </Link>
</td>
     {/* use for code linkable made */}
                    <td>{item.name}</td>
                    <td>{item.subcategory_name}</td>
                    <td>₹{item.mrp}</td>
                    <td>₹{item.rent_price}</td>
                    <td>₹{item.deposit_price}</td>

                    <td className="stock-column">
  {item.stock}
</td>

                    {/* COLOR BOX */}
                    <td>
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "4px",
                          background: item.color || "#ccc",
                          margin: "auto",
                        }}
                      />
                    </td>

                    <td>{item.size}</td>

                    <td>
                      <span className="status active">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                 <td colSpan="11" className="no-data">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShpPrdList;

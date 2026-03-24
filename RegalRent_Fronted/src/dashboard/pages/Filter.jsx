import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Filter = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]); // ✅ dynamic categories
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  /* ================= LOAD CATEGORIES ================= */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/category") // ✅ correct API
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Category fetch error ❌", err));
  }, []);

  /* ================= APPLY FILTER ================= */
  const applyFilters = () => {
    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    navigate(`/products?${params.toString()}`);
  };

  /* ================= RESET ================= */
  const resetFilters = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    navigate("/products");
  };

  return (
    <div className="filter-wrapper">
      <div className="filter-header">
        <h1>Product Filters</h1>
        <p>Refine product list using the filters below</p>
      </div>

      <div className="filter-container">
        {/* ========== CATEGORY ========== */}
        <div className="filter-section">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>

            {categories.map((c) => (
              <option key={c.id} value={c.category_name}>
                {c.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* ========== PRICE ========== */}
        <div className="filter-section">
          <label>Price Range</label>
          <div className="price-inputs">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {/* ========== ACTIONS ========== */}
        <div className="filter-footer">
          <button className="btn-outline" onClick={resetFilters}>
            Reset
          </button>
          <button className="btn-primary" onClick={applyFilters}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;

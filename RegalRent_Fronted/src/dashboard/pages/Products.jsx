import { useState, useEffect } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../api/products";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const emptyProduct = {
    id: null,
    name: "",
    category: "",
    pricePerDay: "",
    startDate: "",
    endDate: "",
    deposit: "",
    duration: 0,
    total: 0,
  };

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  /* ================= FETCH PRODUCTS ================= */
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const filters = {
        category: searchParams.get("category"),
        minPrice: searchParams.get("minPrice"),
        maxPrice: searchParams.get("maxPrice"),
      };

      const res = await getProducts(filters);
      setProducts(res.data);
    };

    fetchProducts();
  }, [searchParams]);

  /* ================= DAY CALCULATION ================= */
  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diff = (e - s) / (1000 * 60 * 60 * 24);
    return diff >= 0 ? diff + 1 : 0;
  };

  const days = editingProduct
    ? calculateDays(editingProduct.startDate, editingProduct.endDate)
    : 0;

  const total = editingProduct
    ? Math.max(
        0,
        Number(editingProduct.pricePerDay || 0) * days -
          Number(editingProduct.deposit || 0)
      )
    : 0;

  /* ================= ADD ================= */
  const handleAdd = () => {
    setEditingProduct(emptyProduct);
    setModalOpen(true);
  };

  /* ================= EDIT ================= */
  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    try {
      const payload = {
        ...editingProduct,
        duration: days,
        total,
      };

      if (editingProduct.id) {
        await updateProduct(editingProduct.id, payload);
      } else {
        await addProduct(payload);
      }

      const res = await getProducts();
      setProducts(res.data);

      setModalOpen(false);
      setEditingProduct(null);
    } catch (err) {
      console.error("Save product error:", err);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Delete product error:", err);
    }
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Products</h1>
        <button className="btn-primary" onClick={handleAdd}>
          + Add Product
        </button>
      </div>

      <div className="products-card">
        <table className="products-table">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Name</th>
              <th>Category</th>
              <th>₹ / Day</th>
              <th>Days</th>
              <th>Deposit</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.pricePerDay || 0}</td>
                <td>{p.duration || 0}</td>
                <td>₹{p.deposit || 0}</td>
                <td>
                  <b>₹{p.total || 0}</b>
                </td>
                <td>
                  <button
                    className="btn-link"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-link danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No products added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {modalOpen && editingProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingProduct.id ? "Edit Product" : "Add Product"}</h3>

            <input
              type="text"
              placeholder="Product Name"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  name: e.target.value,
                })
              }
            />

            <label>Category</label>
            <select
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              }
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.category_name}>
                  {c.category_name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="₹ Price per day"
              value={editingProduct.pricePerDay}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  pricePerDay: e.target.value,
                })
              }
            />

            {/* Dates kept for logic, not shown in table */}
            <label>Start Date</label>
            <input
              type="date"
              value={editingProduct.startDate}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  startDate: e.target.value,
                })
              }
            />

            <label>End Date</label>
            <input
              type="date"
              value={editingProduct.endDate}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  endDate: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Deposit"
              value={editingProduct.deposit}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  deposit: e.target.value,
                })
              }
            />

            <div className="summary-box">
              <p>
                Duration: <b>{days} days</b>
              </p>
              <p>Total = (₹/Day × Days) − Deposit</p>
              <p className="grand-total">
                Payable: <b>₹{total}</b>
              </p>
            </div>

            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

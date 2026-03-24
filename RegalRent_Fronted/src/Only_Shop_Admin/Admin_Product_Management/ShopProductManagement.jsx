
import { useState, useEffect } from "react";
import "./shopProductManagement.css";

import {
  fetchProducts,
  createProduct,
  updateProduct,
} from "../../api/shopAdmin/shopProductApi.js";

import { fetchCategories } from "../../api/shopAdmin/shopCategory.api.js";

const ProductManagement = () => {
  const initialForm = {
    code: "",
    name: "",
    subcategory_id: "",
    mrp: "",
    rent_price: "",
    deposit_price: "",
     stock: "",  // added new for quantity
    color: "#000000",
    size: "",
    status: "active",
    image: null,
    oldImage: "",
  };

  const [form, setForm] = useState(initialForm);
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);

  // LOAD PRODUCTS
  const loadProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res.data || []);
    } catch (err) {
      console.error("Product fetch error", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // LOAD SUBCATEGORIES
  const loadSubCategories = async () => {
    try {
      const res = await fetchCategories();
      const activeOnly =
        res.data?.filter((cat) => cat.status === "active") || [];
      setSubCategories(activeOnly);
    } catch (err) {
      console.error("SubCategory fetch error", err);
    }
  };

  useEffect(() => {
    loadSubCategories();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // HANDLE IMAGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setForm({ ...form, image: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // append only values that exist
      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== "") {
          formData.append(key, form[key]);
        }
      });

      if (editId) {
        await updateProduct(editId, formData);
        alert("Product Updated Successfully");
      } else {
        await createProduct(formData);
        alert("Product Added Successfully");
      }

      setForm(initialForm);
      setPreview(null);
      setEditId(null);

      await loadProducts(); // refresh list
    } catch (err) {
      console.error("Save error", err);
      alert("Error saving product");
    }
  };

  // EDIT
  const handleEdit = (product) => {
    setForm({
      code: product.code || "",
      name: product.name || "",
      subcategory_id: product.subcategory_id || "",
      mrp: product.mrp || "",
      rent_price: product.rent_price || "",
      deposit_price: product.deposit_price || "",
      stock: product.stock || "",     
      //  new added for product quantity
      color: product.color || "#000000",
      size: product.size || "",
      status: product.status || "active",
      image: null,
      oldImage: product.image || "",
    });

    setPreview(
      product.image
        ? `http://localhost:5000/uploads/${product.image}`
        : null
    );

    setEditId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page">
      <h1 className="page-title">Shop-Product Management</h1>

      <div className="form-card">
        <h2>{editId ? "Edit Product" : "Add Product"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="Product Code"
              required
            />

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
            />

            <select
              name="subcategory_id"
              value={form.subcategory_id}
              onChange={handleChange}
              required
            >
              <option value="">Select SubCategory</option>
              {subCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="mrp"
              value={form.mrp}
              onChange={handleChange}
              placeholder="MRP"
              required
            />

            <input
              type="number"
              name="rent_price"
              value={form.rent_price}
              onChange={handleChange}
              placeholder="Rent Price"
              required
            />

            <input
              type="number"
              name="deposit_price"
              value={form.deposit_price}
              onChange={handleChange}
              placeholder="Deposit Price"
              required
            />
            {/* this is new add for product quantity */}
            <input
  type="number"
  name="stock"
  value={form.stock}
  onChange={handleChange}
  placeholder="Quantity"
/>

            <input
              type="color"
              className="color-picker"
              name="color"
              value={form.color}
              onChange={handleChange}
            />

            <select name="size" value={form.size} onChange={handleChange}>
              <option value="">Select</option>
              <option>Free</option>
              <option>S</option>
               <option>XS</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
              <option>XXL</option>
            </select>

            <select name="status" value={form.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="de_active">Inactive</option>
            </select>

            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          {preview && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={preview}
                alt="Preview"
                style={{ width: "120px", borderRadius: "8px" }}
              />
            </div>
          )}

          <button className="btn" type="submit">
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

     <div className="table-card">
  <h2>Product List</h2>

  <div className="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Code</th>
          <th>Name</th>
          <th>SubCategory</th>
          <th>MRP</th>
          <th>Rent</th>
          <th>Deposit</th>
          <th>Stock</th>
          {/* this is new added  " stock "  for product quantity*/}
          <th>Color</th>
          <th>Size</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>
              {p.image && (
                <img
                  src={`http://localhost:5000/uploads/${p.image}?t=${Date.now()}`}
                  alt={p.name}
                  className="table-img"
                />
              )}
            </td>

            <td>{p.code}</td>
            <td>{p.name}</td>
            <td>{p.subcategory_name}</td>
            <td>₹{p.mrp}</td>
            <td>₹{p.rent_price}</td>
            <td>₹{p.deposit_price}</td>
            <td>{p.stock}</td>  
            {/* new added stock for product quantity added */}

            <td>
              <div
                className="color-box"
                style={{ background: p.color }}
              />
            </td>

            <td>{p.size}</td>

            <td>
              <span
                className={`status-badge ${
                  p.status === "active"
                    ? "status-active"
                    : "status-inactive"
                }`}
              >
                {p.status === "active" ? "Active" : "Inactive"}
              </span>
            </td>

            <td>
              <button
                className="action-btn"
                onClick={() => handleEdit(p)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
      </div>
    
  );
};

export default ProductManagement;

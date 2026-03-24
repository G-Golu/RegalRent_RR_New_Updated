import { useEffect, useState } from "react";
import "./createPackage.css";

import {
  createPackage,
  getPackages,
  updatePackage,
  updatePackageStatus,
} from "../../api/packages";

const Package = () => {
  const [form, setForm] = useState({
    package_name: "",
    days: "",
    price: "",
    description: "",
  });

  const [packages, setPackages] = useState([]);
  const [editingId, setEditingId] = useState(null);

  /* FETCH PACKAGES FUNCTION */
  const fetchPackages = async () => {
    try {
      const data = await getPackages();
      console.log("PACKAGES FROM API:", data);
      setPackages(data);
    } catch (error) {
      console.error("LOAD PACKAGES ERROR:", error);
    }
  };

  /* LOAD PACKAGES ON MOUNT */
  useEffect(() => {
  const loadPackages = async () => {
    try {
      const data = await getPackages();
      setPackages(data);
    } catch (error) {
      console.error("LOAD PACKAGES ERROR:", error);
    }
  };

  loadPackages();
}, []);


  /* INPUT CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  /* CREATE / UPDATE */
  const handleSave = async () => {
    if (!form.package_name || !form.days || !form.price) {
      alert("Package Name, Days and Price are required");
      return;
    }

    try {
      if (editingId) {
        await updatePackage(editingId, form);
      } else {
        await createPackage(form);
      }

      // reset form
      setForm({
        package_name: "",
        days: "",
        price: "",
        description: "",
      });
      setEditingId(null);

      // reload packages after save
      await fetchPackages();
    } catch (error) {
      console.error("SAVE PACKAGE ERROR:", error);
    }
  };

  /* EDIT */
  const handleEdit = (pkg) => {
    setForm({
      package_name: pkg.package_name,
      days: pkg.days,
      price: pkg.price,
      description: pkg.description,
    });
    setEditingId(pkg.id);
  };

  /* ENABLE / DISABLE */
  const toggleStatus = async (pkg) => {
  try {
    const newStatus = pkg.status === 1 ? 0 : 1;
    await updatePackageStatus(pkg.id, newStatus);

    //  UPDATE STATE LOCALLY (no refetch, no disappear)
    setPackages((prev) =>
      prev.map((p) =>
        p.id === pkg.id ? { ...p, status: newStatus } : p
      )
    );
  } catch (error) {
    console.error("TOGGLE STATUS ERROR:", error);
  }
};


  return (
    <div className="page subscription-page">
      <h1 className="page-title"> Package Management</h1>

      {/* FORM */}
      <div className="card form-card">
        <h2>{editingId ? "Edit Package" : "Create Package"}</h2>

        <div className="form-grid">
          <div className="form-group">
            <label>Package Name *</label>
            <input
              type="text"
              name="package_name"
              value={form.package_name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Validity (Days) *</label>
            <input
              type="number"
              name="days"
              value={form.days}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="save-btn" onClick={handleSave}>
          {editingId ? "Update Package" : "Create Package"}
        </button>
      </div>

      {/* TABLE */}
      <div className="card table-card">
        <h2>Package List</h2>

        {packages.length === 0 ? (
          <p className="empty-text">No packages found</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Days</th>
                <th>Price</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id}>
                  <td>{pkg.package_name}</td>
                  <td>{pkg.days}</td>
                  <td>₹{pkg.price}</td>
                  <td>
                    <span
                      className={`badge ${
                        pkg.status ? "badge-green" : "badge-red"
                      }`}
                    >
                      {pkg.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>{new Date(pkg.created_at).toLocaleDateString()}</td>
                  <td className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(pkg)}
                    >
                      Edit
                    </button>
                    <button
                      className="status-btn"
                      onClick={() => toggleStatus(pkg)}
                    >
                      {pkg.status ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Package;

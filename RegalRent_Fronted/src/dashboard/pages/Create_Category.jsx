

// import { useEffect, useState, useRef } from "react";
// import { addCategory, getCategories } from "../../api/categoryApi";
// import "./category.css";

// const Category = () => {
//   const [items, setItems] = useState([]);

//   const [form, setForm] = useState({
//     category_name: "",
//     category_image: null,
//     status: "",
//   });

//   const fileInputRef = useRef(null);

//   /* ================= LOAD DATA ================= */
//   const loadData = async () => {
//     try {
//       const res = await getCategories();
//       setItems(res.data);
//     } catch (err) {
//       console.error("Fetch error ❌", err);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   /* ================= INPUT HANDLERS ================= */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setForm((prev) => ({
//         ...prev,
//         category_image: file,
//       }));
//     }
//   };

//   /* ================= SAVE ================= */
//   const handleSave = async () => {
//     if (!form.category_name || !form.category_image || !form.status) {
//       alert("Category name, image and status are required");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("category_name", form.category_name);
//     formData.append("product_image", form.category_image); //  multer field
//     formData.append("status", form.status);

//     try {
//       await addCategory(formData);
//       alert("Category saved ✅");

//       setForm({
//         category_name: "",
//         category_image: null,
//         status: "",
//       });

//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }

//       loadData();
//     } catch (err) {
//       console.error("Save error ❌", err.response || err);
//       alert("Upload failed");
//     }
//   };

//   return (
//     <div className="page today-summary">
//       <h1 className="page-title">Category</h1>
//       <p className="subtitle">Category overview</p>

//       {/* ================= FORM ================= */}
//       <div className="card form-card">
//         <h2>Add Category</h2>

//         <div className="form-group">
//           <label>Category Name *</label>
//           <input
//             type="text"
//             name="category_name"
//             placeholder="Enter category name"
//             value={form.category_name}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label>Status *</label>
//           <select
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//           >
//             <option value="">-- Select Status --</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Category Image *</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImage}
//             ref={fileInputRef}
//           />
//         </div>

//         {form.category_image && (
//           <div className="image-preview">
//             <img
//               src={URL.createObjectURL(form.category_image)}
//               alt="Preview"
//             />
//           </div>
//         )}

//         <button className="save-btn" onClick={handleSave}>
//           Save Category
//         </button>
//       </div>

//       {/* ================= OUTPUT ================= */}
//       <div className="product-grid">
//         {items.length === 0 ? (
//           <p className="empty-text">No categories added</p>
//         ) : (
//           items.map((item) => (
//             <div className="product-card" key={item.id}>
//               <img
//                 src={`http://localhost:5000${item.category_image}`}
//                 alt={item.category_name}
//               />

//               <div className="product-info">
//                 <h3>{item.category_name}</h3>

//                 <p>
//                   Status:{" "}
//                   <b
//                     style={{
//                       color:
//                         item.status === "active" ? "green" : "red",
//                     }}
//                   >
//                     {item.status}
//                   </b>
//                 </p>

//                 <span className="date">
//                   Added:{" "}
//                   {new Date(item.added_at).toLocaleDateString()}
//                 </span>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Category;



//  everything ok only add update and delete btn today is : 18-03-2026









import { useEffect, useState, useRef } from "react";
import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../../api/categoryApi";
import "./category.css";

const Category = () => {
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    category_name: "",
    category_image: null,
    status: "",
  });

  const fileInputRef = useRef(null);

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    try {
      const res = await getCategories();
      setItems(res.data);
    } catch (err) {
      console.error("Fetch error ❌", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= EDIT ================= */
 const handleEdit = (item) => {
  // 👉 agar same card dobara click hua
  if (editId === item.id) {
    // 🔥 reset form
    setForm({
      category_name: "",
      category_image: null,
      status: "",
    });

    setEditId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    return;
  }

  //  normal edit (first click)
  setForm({
    category_name: item.category_name,
    category_image: null,
    status: item.status,
  });

  setEditId(item.id);
//  auto scroll to form (better UX)
  window.scrollTo({ top: 0, behavior: "smooth" });
};

    
  

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      try {
        await deleteCategory(id);
        loadData();
      } catch (err) {
        console.error(err);
        alert("Delete failed ❌");
      }
    }
  };

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        category_image: file,
      }));
    }
  };

  /* ================= SAVE / UPDATE ================= */
  const handleSave = async () => {
    if (!form.category_name || !form.status) {
      alert("Category name and status are required");
      return;
    }

    const formData = new FormData();
    formData.append("category_name", form.category_name);
    formData.append("status", form.status);

    if (form.category_image) {
      formData.append("product_image", form.category_image);
    }

    try {
      if (editId) {
        await updateCategory(editId, formData);
        alert("Category updated ✅");
      } else {
        await addCategory(formData);
        alert("Category added ✅");
      }

      // 🔥 reset form
      setForm({
        category_name: "",
        category_image: null,
        status: "",
      });

      setEditId(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      loadData();
    } catch (err) {
      console.error(err);
      alert("Operation failed ❌");
    }
  };

  return (
    <div className="page today-summary">
      <h1 className="page-title">Category</h1>
      <p className="subtitle">Category overview</p>

      {/* ================= FORM ================= */}
      <div className="card form-card">
        <h2>{editId ? "Update Category" : "Add Category"}</h2>

        <div className="form-group">
          <label>Category Name *</label>
          <input
            type="text"
            name="category_name"
            value={form.category_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status *</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="">-- Select Status --</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            ref={fileInputRef}
          />
        </div>

        {form.category_image && (
          <div className="image-preview">
            <img
              src={URL.createObjectURL(form.category_image)}
              alt="Preview"
            />
          </div>
        )}

        <button className="save-btn" onClick={handleSave}>
          {editId ? "Update Category" : "Create Category"}
        </button>
      </div>

      {/* ================= OUTPUT ================= */}
      <div className="product-grid">
        {items.length === 0 ? (
          <p className="empty-text">No categories added</p>
        ) : (
          items.map((item) => (
            <div
              className="product-card"
              key={item.id}
              onClick={() => handleEdit(item)}
            >
              <img
                src={`http://localhost:5000${item.category_image}`}
                alt={item.category_name}
              />

              <div className="product-info">
                <h3>{item.category_name}</h3>

                <p>
                  Status:{" "}
                  <b
                    style={{
                      color:
                        item.status === "active" ? "green" : "red",
                    }}
                  >
                    {item.status}
                  </b>
                </p>

                <span className="date">
                  Added:{" "}
                  {new Date(item.added_at).toLocaleDateString()}
                </span>
              </div>

              {/* DELETE BUTTON */}
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation(); //  important
                  handleDelete(item.id);
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

 export default Category;
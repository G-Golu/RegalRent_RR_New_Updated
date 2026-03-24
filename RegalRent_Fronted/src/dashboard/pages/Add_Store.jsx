

// import { useState, useEffect } from "react";
// import "./addStore.css";

// import {
//   fetchStores,
//   createStore,
//   updateStore,
//   deleteStore,
// } from "../../api/storeApi";
// import { getPackages } from "../../api/packages";
// import { getCategories } from "../../api/categoryApi";
// import defaultLogo from "../../assets/images/logo.png";
// import "../pages/addStore.css";

// const BACKEND_URL = "http://localhost:5000";

// const AddStore = () => {

//   /* ================= LOGIN STATE ================= */

 

  
//   /* ================= STORE STATE ================= */

//   const emptyForm = {
//     id: null,
//     name: "",
//     logo: null,
//     mobile: "",
//     email: "",
//     password: "",
//     address: "",
//     package: "",
//     categories: [],
//     bank_name: "",
//     account_no: "",
//     account_holder: "",
//     ifsc_code: "",
//   };

//   const [form, setForm] = useState(emptyForm);
//   const [list, setList] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [packageList, setPackageList] = useState([]);
//   const [categoryList, setCategoryList] = useState([]);
//   const [showCat, setShowCat] = useState(false);

//   /* ================= LOADERS ================= */

//   const loadStores = async () => {
//     const res = await fetchStores();
//     setList(res.data);
//   };

//   const loadPackages = async () => {
//     const data = await getPackages();
//     setPackageList(data.filter((p) => p.status === 1));
//   };

//   const loadCategories = async () => {
//     const res = await getCategories();
//     setCategoryList(res.data.filter((c) => c.status === "active"));
//   };

// useEffect(() => {
//   (async () => {
//     await loadStores();
//     await loadPackages();
//     await loadCategories();
//   })();
// }, []);
//   /* ================= HANDLERS ================= */

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLogo = (e) => {
//     const file = e.target.files[0];
//     if (file) setForm((prev) => ({ ...prev, logo: file }));
//   };

//   const toggleCategory = (catName) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(catName)
//         ? prev.categories.filter((c) => c !== catName)
//         : [...prev.categories, catName],
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!form.name || !form.email || !form.mobile || !form.package) {
//       alert("Name, Email, Mobile & Package are required");
//       return;
//     }

//     const fd = new FormData();
//     fd.append("name", form.name);
//     fd.append("mobile", form.mobile);
//     fd.append("email", form.email);
//     fd.append("password", form.password);
//     fd.append("address", form.address);
//     fd.append("package_id", Number(form.package));
//     fd.append("categories", JSON.stringify(form.categories));

//     // BANK DETAILS
//     fd.append("bank_name", form.bank_name);
//     fd.append("account_no", form.account_no);
//     fd.append("account_holder", form.account_holder);
//     fd.append("ifsc_code", form.ifsc_code);

//     if (form.logo instanceof File) fd.append("logo", form.logo);

//     editId ? await updateStore(editId, fd) : await createStore(fd);

//     setForm(emptyForm);
//     setEditId(null);
//     loadStores();
//   };

//   const handleEdit = (store) => {
//     setForm({
//       ...store,
//       package: store.package_id || "",
//       categories: Array.isArray(store.categories)
//         ? store.categories
//         : [],
//       logo: null,
//       password: "",
//       bank_name: store.bank_name || "",
//       account_no: store.account_no || "",
//       account_holder: store.account_holder || "",
//       ifsc_code: store.ifsc_code || "",
//     });

//     setEditId(store.id);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this store?")) {
//       await deleteStore(id);
//       loadStores();
//     }
//   };

  

//   return (
//     <div className="page">
//       <h1>Add Store</h1>

//       <form className="qs-card" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

//         <h3>Account Information</h3>

//         <div className="form-grid">
//           <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
//           <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} />
//           <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
//           <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
//         </div>

//         <div className="form-grid">
//           <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />

//           <select name="package" value={form.package} onChange={handleChange}>
//             <option value="">Select Package</option>
//             {packageList.map((pkg) => (
//               <option key={pkg.id} value={pkg.id}>
//                 {pkg.package_name} • ₹{pkg.price}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* BANK DETAILS */}
//         <h3>Bank Details</h3>

//         <div className="form-grid">
//           <input name="bank_name" placeholder="Bank Name" value={form.bank_name} onChange={handleChange} />
//           <input name="account_no" placeholder="Account Number" value={form.account_no} onChange={handleChange} />
//           <input name="account_holder" placeholder="Account Holder Name" value={form.account_holder} onChange={handleChange} />
//           <input name="ifsc_code" placeholder="IFSC Code" value={form.ifsc_code} onChange={handleChange} />
//         </div>

//         {/* CATEGORY */}
//         <div className="category-select">
//           <div className="category-input" onClick={() => setShowCat(!showCat)}>
//             {form.categories.length > 0 ? form.categories.join(", ") : "Select Categories"}
//             <span className="arrow">▾</span>
//           </div>

//           {showCat && (
//             <div className="category-dropdown">
//               {categoryList.map((cat) => (
//                 <label key={cat.id} className="category-option">
//                   <input
//                     type="checkbox"
//                     checked={form.categories.includes(cat.category_name)}
//                     onChange={() => toggleCategory(cat.category_name)}
//                   />
//                   {cat.category_name}
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="form-footer">
//           <input type="file" onChange={handleLogo} />
//           <button type="submit" className="primary">
//             {editId ? "Update Store" : "Create Store"}
//           </button>
//         </div>
//       </form>

//       {/* STORE LIST */}
//       <div className="profile-grid">
//         {/* {list.map((u) => {
//           const pkg = packageList.find((p) => p.id === Number(u.package_id)); */}

// {list.map((u) => {

//   console.log("STORE DATA 👉", u);
//   console.log("CATEGORIES 👉", u.categories);

//   const pkg = packageList.find((p) => p.id === Number(u.package_id));




//           return (
//           <div className="profile-card temple-card" key={u.id}>
//    <img
//     className="card-logo"
//     src={u.logo ? `${BACKEND_URL}${u.logo}` : defaultLogo }
//     alt="logo"
//   />



//   <div className="store-name">Name: {u.name}</div>

//   <div className="store-package">
//     Package: {pkg ? pkg.package_name : "No Package"}
//   </div>

//   <div className="store-category">
//     Category: {(u.categories || []).join(", ")}

// {/* today update it because not render category in card 06-03-2026 */}
// {/* Category: {
//   Array.isArray(u.categories)
//     ? u.categories.join(", ")
//     : JSON.parse(u.categories || "[]").join(", ")
// }  */}

//   </div>

//   <div className="divider"></div>

//   <div className="bank-details">
//     <div>Bank Name: {u.bank_name || "-"}</div>
//     <div>Account No: {u.account_no || "-"}</div>
//     <div>Holder Name: {u.account_holder || "-"}</div>
//     <div>IFSC Code: {u.ifsc_code || "-"}</div>
//   </div>

//   <div className="card-actions">
//     <button onClick={() => handleEdit(u)}>Edit</button>
//     <button onClick={() => handleDelete(u.id)}>Delete</button>
//   </div>
// </div>


//           );
//         })}
//       </div>

//     </div>
//   );
// };

// export default AddStore;


// comment for category render in card today is 06-03-2026















// import { useState, useEffect } from "react";
// import "./addStore.css";

// import {
//   fetchStores,
//   createStore,
//   updateStore,
//   deleteStore,
// } from "../../api/storeApi";
// import { getPackages } from "../../api/packages";
// import { getCategories } from "../../api/categoryApi";
// import defaultLogo from "../../assets/images/logo.png";
// import "../pages/addStore.css";

// const BACKEND_URL = "http://localhost:5000";

// const AddStore = () => {

//   /* ================= LOGIN STATE ================= */

 

  
//   /* ================= STORE STATE ================= */

//   const emptyForm = {
//     id: null,
//     name: "",
//     logo: null,
//     mobile: "",
//     email: "",
//     password: "",
//     address: "",
//     package: "",
//     categories: [],
//     bank_name: "",
//     account_no: "",
//     account_holder: "",
//     ifsc_code: "",
//   };

//   const [form, setForm] = useState(emptyForm);
//   const [list, setList] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [packageList, setPackageList] = useState([]);
//   const [categoryList, setCategoryList] = useState([]);
//   const [showCat, setShowCat] = useState(false);

//   /* ================= LOADERS ================= */

//   const loadStores = async () => {
//     const res = await fetchStores();
//     console.log("API DATA 👉", res.data);
//     setList(res.data);
//   };

//   const loadPackages = async () => {
//     const data = await getPackages();
//     setPackageList(data.filter((p) => p.status === 1));
//   };

//   const loadCategories = async () => {
//     const res = await getCategories();
//     setCategoryList(res.data.filter((c) => c.status === "active"));
//   };

// useEffect(() => {
//   (async () => {
//     await loadStores();
//     await loadPackages();
//     await loadCategories();
//   })();
// }, []);
//   /* ================= HANDLERS ================= */

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLogo = (e) => {
//     const file = e.target.files[0];
//     if (file) setForm((prev) => ({ ...prev, logo: file }));
//   };

//   const toggleCategory = (catName) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(catName)
//         ? prev.categories.filter((c) => c !== catName)
//         : [...prev.categories, catName],
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!form.name || !form.email || !form.mobile || !form.package) {
//       alert("Name, Email, Mobile & Package are required");
//       return;
//     }

//     const fd = new FormData();
//     fd.append("name", form.name);
//     fd.append("mobile", form.mobile);
//     fd.append("email", form.email);
//     fd.append("password", form.password);
//     fd.append("address", form.address);
//     fd.append("package_id", Number(form.package));
//     fd.append("categories", JSON.stringify(form.categories));

//     // BANK DETAILS
//     fd.append("bank_name", form.bank_name);
//     fd.append("account_no", form.account_no);
//     fd.append("account_holder", form.account_holder);
//     fd.append("ifsc_code", form.ifsc_code);

//     if (form.logo instanceof File) fd.append("logo", form.logo);

//     editId ? await updateStore(editId, fd) : await createStore(fd);

//     setForm(emptyForm);
//     setEditId(null);
//     loadStores();
//   };

//   const handleEdit = (store) => {
//     setForm({
//       ...store,
//       package: store.package_id || "",
//       categories: Array.isArray(store.categories)
//         ? store.categories
//         : [],
//       logo: null,
//       password: "",
//       bank_name: store.bank_name || "",
//       account_no: store.account_no || "",
//       account_holder: store.account_holder || "",
//       ifsc_code: store.ifsc_code || "",
//     });

//     setEditId(store.id);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this store?")) {
//       await deleteStore(id);
//       loadStores();
//     }
//   };

  

//   return (
//     <div className="page">
//       <h1>Add Store</h1>

//       <form className="qs-card" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

//         <h3>Account Information</h3>

//         <div className="form-grid">
//           <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
//           <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} />
//           <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
//           <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
//         </div>

//         <div className="form-grid">
//           <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />

//           <select name="package" value={form.package} onChange={handleChange}>
//             <option value="">Select Package</option>
//             {packageList.map((pkg) => (
//               <option key={pkg.id} value={pkg.id}>
//                 {pkg.package_name} • ₹{pkg.price}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* BANK DETAILS */}
//         <h3>Bank Details</h3>

//         <div className="form-grid">
//           <input name="bank_name" placeholder="Bank Name" value={form.bank_name} onChange={handleChange} />
//           <input name="account_no" placeholder="Account Number" value={form.account_no} onChange={handleChange} />
//           <input name="account_holder" placeholder="Account Holder Name" value={form.account_holder} onChange={handleChange} />
//           <input name="ifsc_code" placeholder="IFSC Code" value={form.ifsc_code} onChange={handleChange} />
//         </div>

//         {/* CATEGORY */}
//         <div className="category-select">
//           <div className="category-input" onClick={() => setShowCat(!showCat)}>
//             {form.categories.length > 0 ? form.categories.join(", ") : "Select Categories"}
//             <span className="arrow">▾</span>
//           </div>

//           {showCat && (
//             <div className="category-dropdown">
//               {categoryList.map((cat) => (
//                 <label key={cat.id} className="category-option">
//                   <input
//                     type="checkbox"
//                     checked={form.categories.includes(cat.category_name)}
//                     onChange={() => toggleCategory(cat.category_name)}
//                   />
//                   {cat.category_name}
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="form-footer">
//           <input type="file" onChange={handleLogo} />
//           <button type="submit" className="primary">
//             {editId ? "Update Store" : "Create Store"}
//           </button>
//         </div>
//       </form>

//       {/* STORE LIST */}
//       <div className="profile-grid">
//         {/* {list.map((u) => {
//           const pkg = packageList.find((p) => p.id === Number(u.package_id)); */}

// {list.map((u) => {

//   console.log("STORE DATA 👉", u);
//   console.log("CATEGORIES 👉", u.categories);

//   const pkg = packageList.find((p) => p.id === Number(u.package_id));

// let expiryStatus = "Active";

// if (pkg && u.created_at) {

//   const createdDate = new Date(u.created_at);

//   const expiryDate = new Date(createdDate);
//   expiryDate.setDate(createdDate.getDate() + Number(pkg.days));

//   const today = new Date();

//   const diffDays = Math.ceil(
//     (expiryDate - today) / (1000 * 60 * 60 * 24)
//   );

//   if (diffDays <= 0) {
//     expiryStatus = "Inactive";
//   } 
//   else if (diffDays <= 7) {
//     expiryStatus = `${diffDays} days left`;
//   } 
//   else {
//     expiryStatus = "Active";
//   }
// }




//           return (
//           <div className="profile-card temple-card" key={u.id}>
//    <img
//     className="card-logo"
//     src={u.logo ? `${BACKEND_URL}${u.logo}` : defaultLogo }
//     alt="logo"
//   />



//   <div className="store-name">Name: {u.name}</div>

//   <div className="store-package">
//     Package: {pkg ? pkg.package_name : "No Package"}
//   </div>
// <div
//   className={`store-expiry ${
//     expiryStatus === "Active"
//       ? "status-active"
//       : expiryStatus === "Inactive"
//       ? "status-expired"
//       : "status-warning"
//   }`}
// >
//   Status: {expiryStatus}
// </div>

//   {/* <div className="store-category">
//     Category: {(u.categories || []).join(", ")} */}

// {/* today update it because not render category in card 06-03-2026 */}

// <div className="store-category">
//   Category: {
//     Array.isArray(u.categories)
//       ? u.categories.join(", ")
//       : JSON.parse(u.categories || "[]").join(", ")
//   }


 



//   </div>

//   <div className="divider"></div>

//   <div className="bank-details">
//     <div>Bank Name: {u.bank_name || "-"}</div>
//     <div>Account No: {u.account_no || "-"}</div>
//     <div>Holder Name: {u.account_holder || "-"}</div>
//     <div>IFSC Code: {u.ifsc_code || "-"}</div>
//   </div>

//   <div className="card-actions">
//     <button onClick={() => handleEdit(u)}>Edit</button>
//     <button onClick={() => handleDelete(u.id)}>Delete</button>
//   </div>
// </div>


//           );
//         })}
//       </div>

//     </div>
//   );
// };

// export default AddStore;


// all correct only comment for card ui improve today is 10-03-2026

































import { useState, useEffect } from "react";
import "./addStore.css";

import {
  fetchStores,
  createStore,
  updateStore,
  deleteStore,
} from "../../api/storeApi";
import { getPackages } from "../../api/packages";
import { getCategories } from "../../api/categoryApi";
import defaultLogo from "../../assets/images/logo.png";
import "../pages/addStore.css";

const BACKEND_URL = "http://localhost:5000";


//  package color badge 
const getPackageColor = (pkgName) => {

  if (!pkgName) return "#888";

  const name = pkgName.toLowerCase();

  if (name.includes("gold")) return "#D4AF37";
  if (name.includes("silver")) return "#C0C0C0";
  if (name.includes("platinum")) return "#1f2937";
  if (name.includes("premium")) return "#7c3aed";
  if (name.includes("basic")) return "#6b7280";

  return "#2563eb"; // default color
};




const AddStore = () => {

 
  /* ================= STORE STATE ================= */

  const emptyForm = {
    id: null,
    name: "",
    logo: null,
    mobile: "",
    email: "",
    password: "",
    address: "",
    package: "",
    categories: [],
    bank_name: "",
    account_no: "",
    account_holder: "",
    ifsc_code: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [packageList, setPackageList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [showCat, setShowCat] = useState(false);

  /* ================= LOADERS ================= */

  const loadStores = async () => {
    const res = await fetchStores();
    console.log("API DATA 👉", res.data);
    setList(res.data);
  };

  const loadPackages = async () => {
    const data = await getPackages();
    setPackageList(data.filter((p) => p.status === 1));
  };

  const loadCategories = async () => {
    const res = await getCategories();
    setCategoryList(res.data.filter((c) => c.status === "active"));
  };

useEffect(() => {
  (async () => {
    await loadStores();
    await loadPackages();
    await loadCategories();
  })();
}, []);
  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (file) setForm((prev) => ({ ...prev, logo: file }));
  };

  const toggleCategory = (catName) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(catName)
        ? prev.categories.filter((c) => c !== catName)
        : [...prev.categories, catName],
    }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.mobile || !form.package) {
      alert("Name, Email, Mobile & Package are required");
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("mobile", form.mobile);
    fd.append("email", form.email);
    fd.append("password", form.password);
    fd.append("address", form.address);
    fd.append("package_id", Number(form.package));
    fd.append("categories", JSON.stringify(form.categories));

    // BANK DETAILS
    fd.append("bank_name", form.bank_name);
    fd.append("account_no", form.account_no);
    fd.append("account_holder", form.account_holder);
    fd.append("ifsc_code", form.ifsc_code);

    if (form.logo instanceof File) fd.append("logo", form.logo);

    editId ? await updateStore(editId, fd) : await createStore(fd);

    setForm(emptyForm);
    setEditId(null);
    loadStores();
  };

  const handleEdit = (store) => {
    setForm({
      ...store,
      package: store.package_id || "",
      categories: Array.isArray(store.categories)
        ? store.categories
        : [],
      logo: null,
      password: "",
      bank_name: store.bank_name || "",
      account_no: store.account_no || "",
      account_holder: store.account_holder || "",
      ifsc_code: store.ifsc_code || "",
    });

    setEditId(store.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this store?")) {
      await deleteStore(id);
      loadStores();
    }
  };

  

  return (
    <div className="page">
      <h1>Add Store</h1>

      <form className="qs-card" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

        <h3>Account Information</h3>

        <div className="form-grid">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        </div>

        <div className="form-grid">
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />

          <select name="package" value={form.package} onChange={handleChange}>
            <option value="">Select Package</option>
            {packageList.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.package_name} • ₹{pkg.price}
              </option>
            ))}
          </select>
        </div>

        {/* BANK DETAILS */}
        <h3>Bank Details</h3>

        <div className="form-grid">
          <input name="bank_name" placeholder="Bank Name" value={form.bank_name} onChange={handleChange} />
          <input name="account_no" placeholder="Account Number" value={form.account_no} onChange={handleChange} />
          <input name="account_holder" placeholder="Account Holder Name" value={form.account_holder} onChange={handleChange} />
          <input name="ifsc_code" placeholder="IFSC Code" value={form.ifsc_code} onChange={handleChange} />
        </div>

        {/* CATEGORY */}
        <div className="category-select">
          <div className="category-input" onClick={() => setShowCat(!showCat)}>
            {form.categories.length > 0 ? form.categories.join(", ") : "Select Categories"}
            <span className="arrow">▾</span>
          </div>

          {showCat && (
            <div className="category-dropdown">
              {categoryList.map((cat) => (
                // <label key={cat.id} className="category-option">
                //   <input
                //     type="checkbox"
                //     checked={form.categories.includes(cat.category_name)}
                //     onChange={() => toggleCategory(cat.category_name)}
                //   />
                //   {cat.category_name}
                // </label>


<label key={cat.id} className="category-row">
  <span>{cat.category_name}</span>

  <input
    type="checkbox"
    checked={form.categories.includes(cat.category_name)}
    onChange={() => toggleCategory(cat.category_name)}
  />
</label>




              ))}
            </div>
          )}
        </div>

        <div className="form-footer">
          <input type="file" onChange={handleLogo} />
          <button type="submit" className="primary">
            {editId ? "Update Store" : "Create Store"}
          </button>
        </div>
      </form>

      {/* STORE LIST */}
      <div className="profile-grid">
        {/* {list.map((u) => {
          const pkg = packageList.find((p) => p.id === Number(u.package_id)); */}

{list.map((u) => {

  console.log("STORE DATA 👉", u);
  console.log("CATEGORIES 👉", u.categories);


  
const pkg = packageList.find((p) => p.id === Number(u.package_id));

const badgeColor = getPackageColor(pkg?.package_name);


let expiryStatus = "Active";

if (pkg && u.created_at) {

  const createdDate = new Date(u.created_at);

  const expiryDate = new Date(createdDate);
  expiryDate.setDate(createdDate.getDate() + Number(pkg.days));

  const today = new Date();

  const diffDays = Math.ceil(
    (expiryDate - today) / (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 0) {
    expiryStatus = "Inactive";
  } 
  else if (diffDays <= 7) {
    expiryStatus = `${diffDays} days left`;
  } 
  else {
    expiryStatus = "Active";
  }

}

/* ===== PACKAGE TYPE ===== */

let packageType = "silver";

if (pkg) {

  const days = Number(pkg.days);

  if (days <= 28) {
    packageType = "silver";
  } 
  else if (days <= 180) {
    packageType = "gold";
  } 
  else if (days <= 365) {
    packageType = "platinum";
  } 
  else {
    packageType = "platinum-pro";
  }

}




          return (
        // <div className={`profile-card temple-card ${packageType}`} key={u.id}>
        <div className="profile-card temple-card" key={u.id}>

<div className={`package-badge badge-${packageType}`}>
{
  packageType === "silver" ? "SILVER" :
  packageType === "gold" ? "GOLD" :
  packageType === "platinum" ? "PLATINUM" :
  "PLATINUM PRO"
}
</div>

<img
className="card-logo"
src={u.logo ? `${BACKEND_URL}${u.logo}` : defaultLogo}
alt="logo"
style={{ borderColor: badgeColor }}
/>


  <div className="store-name">Name: {u.name}</div>

  <div className="store-package">
    Package: {pkg ? pkg.package_name : "No Package"}
  </div>
<div
  className={`store-expiry ${
    expiryStatus === "Active"
      ? "status-active"
      : expiryStatus === "Inactive"
      ? "status-expired"
      : "status-warning"
  }`}
>
  Status: {expiryStatus}
</div>

 
<div className="store-category">
  Category: {
    Array.isArray(u.categories)
      ? u.categories.join(", ")
      : JSON.parse(u.categories || "[]").join(", ")
  }


 



  </div>

  <div className="divider"></div>

  <div className="bank-details">
    <div>Bank Name: {u.bank_name || "-"}</div>
    <div>Account No: {u.account_no || "-"}</div>
    <div>Holder Name: {u.account_holder || "-"}</div>
    <div>IFSC Code: {u.ifsc_code || "-"}</div>
  </div>

  <div className="card-actions">
    <button onClick={() => handleEdit(u)}>Edit</button>
    <button onClick={() => handleDelete(u.id)}>Delete</button>
  </div>
</div>


          );
        })}
      </div>

    </div>
  );
};

export default AddStore;



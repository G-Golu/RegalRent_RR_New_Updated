
// import { useState, useEffect } from "react";
// import "./shopCategory.css";

// import {
//   fetchCategories,
//   createCategory,
//   updateCategory,
//   toggleCategoryStatus,
// } from "../../api/shopAdmin/shopCategory.api";

// import { getCategories } from "../../api/categoryApi";

// const CategoryManagement = () => {

//   const initialForm = {
//     id: null,
//     name: "",
//     master: "",
//     status: "active",
//     image: null,
//   };

//   const [form, setForm] = useState(initialForm);
//   const [categories, setCategories] = useState([]);
//   const [adminCategories, setAdminCategories] = useState([]);
//   const [editIndex, setEditIndex] = useState(-1);


//   /* ================= LOAD SUB CATEGORIES ================= */
//   const loadCategories = async () => {
//     try {
//       const res = await fetchCategories();
//       setCategories(res.data || []);
//     } catch (err) {
//       console.error("Fetch category error", err);
//     }
//   };


//   /* ================= LOAD ADMIN CATEGORIES ================= */
//   const loadAdminCategories = async () => {
//     try {
//       const res = await getCategories();
//       setAdminCategories(res.data || []);
//     } catch (err) {
//       console.error("Fetch admin category error", err);
//     }
//   };


//   /* ================= LOAD DATA ================= */
//   useEffect(() => {
//     loadCategories();
//     loadAdminCategories();
//   }, []);


//   /* ================= INPUT CHANGE ================= */
//   const handleChange = (e) => {

//     const { name, value, files } = e.target;

//     // ✅ store file directly (NOT base64)
//     if (files && files[0]) {

//       setForm((prev) => ({
//         ...prev,
//         image: files[0],
//       }));

//     } else {

//       setForm((prev) => ({
//         ...prev,
//         [name]: value,
//       }));

//     }

//   };


//   /* ================= CREATE / UPDATE ================= */
//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     try {

//       const formData = new FormData();

//       formData.append("name", form.name);
//       formData.append("master", form.master);
//       formData.append("status", form.status);

//       if (form.image instanceof File) {
//         formData.append("image", form.image);
//       }

//       if (editIndex === -1) {

//         await createCategory(formData);

//       } else {

//         await updateCategory(form.id, formData);

//       }

//       setForm(initialForm);
//       setEditIndex(-1);
//       loadCategories();

//     } catch (err) {

//       console.error("Save category error", err);

//     }

//   };


//   /* ================= EDIT ================= */
//   const handleEdit = (index) => {

//     const selected = categories[index];

//     setForm({
//       id: selected.id,
//       name: selected.name,
//       master: selected.master,
//       status: selected.status,
//       image: null, // do not preload old image as file
//     });

//     setEditIndex(index);

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });

//   };


//   /* ================= TOGGLE STATUS ================= */
//   const toggleStatus = async (index) => {

//     const cat = categories[index];

//     const newStatus =
//       cat.status === "active"
//         ? "de_active"
//         : "active";

//     try {

//       await toggleCategoryStatus(cat.id, newStatus);

//       loadCategories();

//     } catch (err) {

//       console.error("Status update error", err);

//     }

//   };


//   return (

//     <div className="page">

//       <h1 className="page-title">
//         Sub Category Management
//       </h1>


//       {/* ================= FORM ================= */}
//       <div className="form-card big">

//         <h2>
//           {
//             editIndex === -1
//               ? "Create Sub Category"
//               : "Edit Sub Category"
//           }
//         </h2>


//         <form onSubmit={handleSubmit}>

//           <div className="form-grid">


//             {/* NAME */}
//             <input
//               name="name"
//               placeholder="Sub category name"
//               value={form.name}
//               onChange={handleChange}
//               required
//             />


//             {/* MASTER CATEGORY */}
//             <select
//               name="master"
//               value={form.master}
//               onChange={handleChange}
//               required
//             >

//               <option value="">
//                 Select category
//               </option>

//               {
//                 adminCategories.map((cat) => (

//                   <option
//                     key={cat.id}
//                     value={cat.category_name}
//                   >
//                     {cat.category_name}
//                   </option>

//                 ))
//               }

//             </select>


//             {/* STATUS */}
//             <select
//               name="status"
//               value={form.status}
//               onChange={handleChange}
//             >

//               <option value="active">
//                 Active
//               </option>

//               <option value="de_active">
//                 De-Active
//               </option>

//             </select>


//             {/* IMAGE */}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleChange}
//             />


//           </div>


//           <button
//             className="btn btn-primary"
//             type="submit"
//           >

//             {
//               editIndex === -1
//                 ? "Create Sub Category"
//                 : "Update Sub Category"
//             }

//           </button>


//         </form>

//       </div>



//       {/* ================= TABLE ================= */}
//       {
//         categories.length > 0 && (

//           <div className="output-card">

//             <table className="category-table">

//               <tbody>

//                 {
//                   categories.map((cat, i) => (

//                     <tr key={cat.id}>


//                       {/* IMAGE */}
//                       <td>

//                         {
//                           cat.image && (

//                             <img
//                               src={
//                                 cat.image.startsWith("data:image")
//                                   ? cat.image
//                                   : `http://localhost:5000${cat.image}`
//                               }
//                               alt={cat.name}
//                               width="60"
//                             />

//                           )
//                         }

//                       </td>


//                       {/* NAME */}
//                       <td>
//                         {cat.name}
//                       </td>


//                       {/* MASTER */}
//                       <td>
//                         {cat.master}
//                       </td>


//                       {/* STATUS */}
//                       <td
//                         className={
//                           cat.status === "active"
//                             ? "status-active"
//                             : "status-deactive"
//                         }
//                       >
//                         {cat.status}
//                       </td>


//                       {/* ACTIONS */}
//                       <td>

//                         <button
//                           className="btn btn-edit"
//                           onClick={() => handleEdit(i)}
//                         >
//                           Edit
//                         </button>


//                         <button
//                           className={
//                             `btn ${
//                               cat.status === "active"
//                                 ? "btn-deactive"
//                                 : "btn-enable"
//                             }`
//                           }
//                           onClick={() => toggleStatus(i)}
//                         >
//                           {
//                             cat.status === "active"
//                               ? "De-Activate"
//                               : "Enable"
//                           }
//                         </button>


//                       </td>


//                     </tr>

//                   ))
//                 }


//               </tbody>

//             </table>

//           </div>

//         )
//       }


//     </div>

//   );

// };

// export default CategoryManagement;


// no any issue only try to correct css for today is 05-03-2026






import { useState, useEffect } from "react";
import "./shopCategory.css";

import {
  fetchCategories,
  createCategory,
  updateCategory,
  toggleCategoryStatus,
} from "../../api/shopAdmin/shopCategory.api";

import { getCategories } from "../../api/categoryApi";

const CategoryManagement = () => {

  const initialForm = {
    id: null,
    name: "",
    master: "",
    status: "active",
    image: null,
  };

  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState([]);
  const [adminCategories, setAdminCategories] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);


  /* ================= LOAD SUB CATEGORIES ================= */
  const loadCategories = async () => {
    try {
      const res = await fetchCategories();
      setCategories(res.data || []);
    } catch (err) {
      console.error("Fetch category error", err);
    }
  };


  /* ================= LOAD ADMIN CATEGORIES ================= */
  const loadAdminCategories = async () => {
    try {
      const res = await getCategories();
      setAdminCategories(res.data || []);
    } catch (err) {
      console.error("Fetch admin category error", err);
    }
  };


  /* ================= LOAD DATA ================= */
  useEffect(() => {
    loadCategories();
    loadAdminCategories();
  }, []);


  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {

    const { name, value, files } = e.target;

    // ✅ store file directly (NOT base64)
    if (files && files[0]) {

      setForm((prev) => ({
        ...prev,
        image: files[0],
      }));

    } else {

      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));

    }

  };


  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("master", form.master);
      formData.append("status", form.status);

      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      if (editIndex === -1) {

        await createCategory(formData);

      } else {

        await updateCategory(form.id, formData);

      }

      setForm(initialForm);
      setEditIndex(-1);
      loadCategories();

    } catch (err) {

      console.error("Save category error", err);

    }

  };


  /* ================= EDIT ================= */
  const handleEdit = (index) => {

    const selected = categories[index];

    setForm({
      id: selected.id,
      name: selected.name,
      master: selected.master,
      status: selected.status,
      image: null, // do not preload old image as file
    });

    setEditIndex(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* ================= TOGGLE STATUS ================= */
  const toggleStatus = async (index) => {

    const cat = categories[index];

    const newStatus =
      cat.status === "active"
        ? "de_active"
        : "active";

    try {

      await toggleCategoryStatus(cat.id, newStatus);

      loadCategories();

    } catch (err) {

      console.error("Status update error", err);

    }

  };


  return (

    <div className="page">

      <h1 className="page-title">
        Sub Category Management
      </h1>


      {/* ================= FORM ================= */}
      <div className="form-card big">

        <h2>
          {
            editIndex === -1
              ? "Create Sub Category"
              : "Edit Sub Category"
          }
        </h2>


        <form onSubmit={handleSubmit}>

          <div className="form-grid">


            {/* NAME */}
            <input
              name="name"
              placeholder="Sub category name"
              value={form.name}
              onChange={handleChange}
              required
            />


            {/* MASTER CATEGORY */}
            <select
              name="master"
              value={form.master}
              onChange={handleChange}
              required
            >

              <option value="">
                Select category
              </option>

              {
                adminCategories.map((cat) => (

                  <option
                    key={cat.id}
                    value={cat.category_name}
                  >
                    {cat.category_name}
                  </option>

                ))
              }

            </select>


            {/* STATUS */}
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >

              <option value="active">
                Active
              </option>

              <option value="de_active">
                De-Active
              </option>

            </select>


            {/* IMAGE */}
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
            />


          </div>


          <button
            className="btn btn-primary"
            type="submit"
          >

            {
              editIndex === -1
                ? "Create Sub Category"
                : "Update Sub Category"
            }

          </button>


        </form>

      </div>



      {/* ================= TABLE ================= */}
      {
        categories.length > 0 && (

          <div className="output-card">

            <table className="category-table">

              <thead>
    <tr>
      <th>Image</th>
      <th>Sub Category Name</th>
      <th>Admin Category</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>



              <tbody>

                {
                  categories.map((cat, i) => (

                    <tr key={cat.id}>


                      {/* IMAGE */}
                      <td>

                        {
                          cat.image && (

                            <img
                              src={
                                cat.image.startsWith("data:image")
                                  ? cat.image
                                  : `http://localhost:5000${cat.image}`
                              }
                              alt={cat.name}
                              width="60"
                            />

                          )
                        }

                      </td>


                      {/* NAME */}
                      <td>
                        {cat.name}
                      </td>


                      {/* MASTER */}
                      <td>
                        {cat.master}
                      </td>


                      {/* STATUS */}
                      <td
                        className={
                          cat.status === "active"
                            ? "status-active"
                            : "status-deactive"
                        }
                      >
                        {cat.status}
                      </td>


                      {/* ACTIONS */}
                      <td>

                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(i)}
                        >
                          Edit
                        </button>


                        <button
                          className={
                            `btn ${
                              cat.status === "active"
                                ? "btn-deactive"
                                : "btn-enable"
                            }`
                          }
                          onClick={() => toggleStatus(i)}
                        >
                          {
                            cat.status === "active"
                              ? "De-Activate"
                              : "Enable"
                          }
                        </button>


                      </td>


                    </tr>

                  ))
                }


              </tbody>

            </table>

          </div>

        )
      }


    </div>

  );

};

export default CategoryManagement;
// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // ADD CATEGORY
// export const addCategory = (formData) => {
//   return API.post("/category/add", formData, {
   
//   });
// };

// // GET CATEGORY
// export const getCategories = () => {
//   return API.get("/category");
// };






// all ok
//  today new added update and delete , 18-03-2026 




import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ADD
export const addCategory = (formData) => {
  return API.post("/category/add", formData);
};

// GET
export const getCategories = () => {
  return API.get("/category");
};

// UPDATE
export const updateCategory = (id, data) => {
  return API.put(`/category/${id}`, data); // ✅ FIXED
};

// DELETE
export const deleteCategory = (id) => {
  return API.delete(`/category/${id}`); // ✅ FIXED
};
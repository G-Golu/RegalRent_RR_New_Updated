// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// export const fetchCategories = () =>
//   API.get("/shop_category");

// export const createCategory = (data) =>
//   API.post("/shop_category", data);

// export const updateCategory = (id, data) =>
//   API.put(`/shop_category/${id}`, data);

// export const toggleCategoryStatus = (id, status) =>
//   API.patch("/shop_category/status", { id, status });


// all correct today is 23-02-2026











import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchCategories = () =>
  API.get("/shop_category");

export const createCategory = (data) =>
  API.post("/shop_category", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateCategory = (id, data) =>
  API.put(`/shop_category/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const toggleCategoryStatus = (id, status) =>
  API.patch("/shop_category/status", { id, status });


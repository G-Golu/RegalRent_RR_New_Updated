import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchProducts = () =>
  API.get("/shop_product");

export const createProduct = (data) =>
  API.post("/shop_product", data);

export const updateProduct = (id, data) =>
  API.put(`/shop_product/${id}`, data);

export const toggleProductStatus = (id, status) =>
  API.patch("/shop_product/status", { id, status });

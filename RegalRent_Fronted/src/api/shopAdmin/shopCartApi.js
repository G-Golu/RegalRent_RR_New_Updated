import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/cart"
});

export const addToCartApi = (data) =>
  API.post("/add", data);

export const getCartApi = (userId) =>
  API.get(`/${userId}`);

export const removeCartApi = (id) =>
  API.delete(`/${id}`);

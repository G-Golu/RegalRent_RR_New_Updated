import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const saveOrderApi = (data) =>
  API.post("/order", data);

export const getOrdersApi = () =>
  API.get("/order");

// ✅ GET ORDER BY ID   (YE MISSING THA)
export const fetchOrderById = (id) =>
  API.get(`/order/${id}`);
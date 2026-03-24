import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
});

// Get all shop orders
export const fetchOrders = () => API.get("/shop-orders");

// Update order status or return status
export const updateOrder = (id, data) => API.put(`/shop-orders/${id}`, data);

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getInventory = () => API.get("/inventory");

export const updateInventory = (data) =>
  API.put("/inventory", data);

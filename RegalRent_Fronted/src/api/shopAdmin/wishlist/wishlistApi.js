import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/wishlist"
});

/* ADD */
export const addWishlistApi = (data) =>
  API.post("/add", data);

/* GET */
export const getWishlistApi = (userId) =>
  API.get(`/${userId}`);

/* DELETE */
export const removeWishlistApi = (id) =>
  API.delete(`/${id}`);
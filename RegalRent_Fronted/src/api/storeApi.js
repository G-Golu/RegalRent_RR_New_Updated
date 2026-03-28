

import axios from "axios";

const API = "http://localhost:5000/api/stores";

export const fetchStores = () => axios.get(API);
export const createStore = (data) => axios.post(API, data);
export const updateStore = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteStore = (id) => axios.delete(`${API}/${id}`);
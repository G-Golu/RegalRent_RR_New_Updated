

import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

/* FETCH ORDER BY ID */
export const fetchOrderById = async (orderId) => {
  const res = await axios.get(`${BASE_URL}/order/${orderId}`);
  return res.data;
};

/* CREATE RETURN */
export const createReturn = async (payload) => {
  const res = await axios.post(`${BASE_URL}/return/create`, payload);
  return res.data;
};

/* FETCH RETURN LIST */
export const fetchReturnList = async () => {
  const res = await axios.get(`${BASE_URL}/return/list`);
  return res.data;
};
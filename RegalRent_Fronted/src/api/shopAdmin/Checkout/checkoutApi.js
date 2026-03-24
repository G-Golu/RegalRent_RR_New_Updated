import axios from "axios";

const baseURL = "http://localhost:5000/api"; // define baseURL

// CREATE CHECKOUT ORDER
export const createCheckoutApi = async (data) => {
  return await axios.post(`${baseURL}/checkout/create`, data);
};

// GET CHECKOUT LIST
export const getCheckoutListApi = async () => {
  return await axios.get(`${baseURL}/checkout/list`);
};

// STAFF API (correct named export)
export const getStaff = () => {
  return axios.get(`${baseURL}/staff`);
};


// UPDATE PAYMENT STATUS today is 27-02-2026
export const updatePaymentApi = async (data) => {
  return await axios.post(`${baseURL}/checkout/update-payment`, data);
};




import axios from "axios";

const API_URL = "http://localhost:5000/api/packages";

// CREATE
export const createPackage = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// READ
export const getPackages = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// UPDATE
export const updatePackage = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

// STATUS TOGGLE
export const updatePackageStatus = async (id, status) => {
  const res = await axios.put(`${API_URL}/status/${id}`, { status });
  return res.data;
};



// currently use 



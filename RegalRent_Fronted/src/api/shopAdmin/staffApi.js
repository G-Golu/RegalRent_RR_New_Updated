import API from "../../api/axios";

// ADD
export const addStaff = (data) => {
  return API.post("/staff/add", data);
};

export const getStaff = () => {
  return API.get("/staff");
};

// update 
export const updateStaff = (id, data) => {
  return API.put(`/staff/${id}`, data);
};

// delete
export const deleteStaff = (id) => {
  return API.delete(`/staff/${id}`);
};
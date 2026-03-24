import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* CHECK DATE CONFLICT */
// export const checkBookingApi = (data) =>
//   API.post("/booking/check-booking", data);

/* CREATE BOOKING */
export const createBookingApi = (data) =>
  // API.post("/booking/create-booking", data);  // change this
  API.post("/shop-admin/bookings/create-booking", data);

/* GET BOOKED DATES */
export const getBookedDatesApi = (productId) =>
  API.get(`/booking/booked-dates/${productId}`);

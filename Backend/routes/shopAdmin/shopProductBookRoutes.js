// import express from "express";
// import {
//  // checkDateConflict,
//   createBooking,
//   getBookedDates
// } from "../../controller/shopAdmin/shopProductBookController.js";

// const router = express.Router();

// router.get("/booked-dates/:productId", getBookedDates);
// // router.post("/check-booking", checkDateConf);  / this is for below

// router.post("/create-booking", createBooking);

// export default router;



// today is 23-02-2026



import express from "express";
import {
  createBooking,
  getBookedDates,
  getAllBookings ,  // ✅ ADD THIS
  completeReturn 
  
} from "../../controller/shopAdmin/shopProductBookController.js";

const router = express.Router();

// ✅ RETURN LIST API
router.get("/", getAllBookings);

// existing routes
router.get("/booked-dates/:productId", getBookedDates);
router.post("/create-booking", createBooking);
// new added date modyfy
router.post("/complete-return", completeReturn);


export default router;
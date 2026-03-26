

// process.env.TZ = "Asia/Kolkata";
// import dotenv from "dotenv";
// dotenv.config();
// // importn

// import express from "express";
// import cors from "cors";
// import path from "path";

// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/user.routes.js";
// import productsRoutes from "./routes/products.routes.js";
// import packageRoutes from "./routes/packageRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import storeRoutes from "./routes/storeRoutes.js";

// // shop-admin----
// // import shopProductBookRoutes from "./routes/shopAdmin/shopProductBookRoutes.js";
// import shopProductBookRoutes from "./routes/shopAdmin/shopProductBookRoutes.js";
// import shopCartRoutes from "./routes/shopAdmin/shopCartRoutes.js";

// // Shop Return Page ---------------------------------------------

// import shopReturnRoutes  from "./routes/shopAdmin/Return/shopReturnRoutes.js"
// import shopReturnListRoutes from "./routes/shopAdmin/Return/shopReturnListRoute.js"

// //  shop-admin checkout page -------------------------
//     import checkoutRoutes from "./routes/shopAdmin/Checkout/checkoutRoutes.js";



// // add here Shop Order History --------------------------------
// import shopOrderHistoryRoutes from "./routes/shopAdmin/OrderHistory/shopOrderHistoryRoutes.js";


// import shopAdminRoutes from "./routes/shopAdmin/shopAdminRoutes.js";
// import inventoryRoutes from "./routes/shopAdmin/inventoryRoutes.js";
// import shopCategoryRoutes from "./routes/shopAdmin/shopCategoryRoutes.js";
// import shopProductRoutes from "./routes/shopAdmin/shopProductRoutes.js";
// import shopOrderRoutes from "./routes/shopAdmin/shopOrder.routes.js";

// import adminTransactionRoutes from "./routes/adminTransactionRoutes.js";
// // use for staff
// import staffRoutes from "./routes/shopAdmin/staffRoutes.js";

// const app = express();
// const PORT = 5000;
// // console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
// // console.log("API Key:", process.env.CLOUDINARY_API_KEY);


// /* CORS FIX */
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// // app.use(express.json()); // today is 23-02-2026
// app.use(express.json({ limit: "1000mb" }));
// // app.use(express.urlencoded({ extended: true }));  // today is 23-02-2026
// app.use(express.urlencoded({ extended: true, limit: "1000mb" }));


// app.use("/uploads", express.static("uploads"));

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/products", productsRoutes);
// app.use("/api/packages", packageRoutes);
// app.use("/api/category", categoryRoutes);
// app.use("/api/stores", storeRoutes);

// /* SHOP ADMIN ROUTES */

// // app.use("/api/shop-admin/booking", shopProductBookRoutes);
// app.use("/api/shop-admin/bookings", shopProductBookRoutes);

// app.use("/api/cart", shopCartRoutes);

// // shopReturnRoutes ------------------------------------

// app.use("/api/returns" , shopReturnRoutes);
// app.use("/api/shop-admin", shopReturnListRoutes);


// // shop-admin checkout routes -------------------------
// app.use("/api/checkout", checkoutRoutes);



// // add here Shop Order History --------------------------------
// app.use("/api", shopOrderHistoryRoutes);




// app.use("/api/shop-admin", shopAdminRoutes);

// app.use("/api/inventory", inventoryRoutes);
// app.use("/api/shop_category", shopCategoryRoutes);
// app.use("/api/shop_product", shopProductRoutes);
// app.use("/api/shop-orders", shopOrderRoutes);




// // use for staff
// app.use("/api/staff",staffRoutes);

// app.use("/api", adminTransactionRoutes);

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });

































 // all are good , only comment for use payment  integrity 







 

process.env.TZ = "Asia/Kolkata";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
// importn
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.routes.js";
import productsRoutes from "./routes/products.routes.js";
import packageRoutes from "./routes/packageRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";

// new added -- only UserRequestList --admin heading notification 25-03-2026 --------------------------
 import userRequestListRoutes from "./routes/UserRequestList/userRequestListRoutes.js"


// ===============================  Only Admin Reports =========================================
import financeReportRoutes from "./routes/adminReportRoutes/financeReportRoutes.js";
import inventoryReportRoutes from "./routes/adminReportRoutes/inventoryReportRoutes.js"
import transactionReportRoutes from "./routes/adminReportRoutes/transactionReportRoutes.js";

// ===============================  Only Admin Reports =========================================

// this is shop-admin profile image upload 
// import auth from "./routes/auth.js";

//  new added passwordRoutes =================================

import passwordRoutes from "./routes/PasswordRoute/passwordRoutes.js"







// shop-admin----
// import shopProductBookRoutes from "./routes/shopAdmin/shopProductBookRoutes.js";
import shopProductBookRoutes from "./routes/shopAdmin/shopProductBookRoutes.js";
import shopCartRoutes from "./routes/shopAdmin/shopCartRoutes.js";


// Notification -==================

import shopNotificationRoutes from "./routes/ShopUserNotification/shopNotificationRoutes.js"



// Shop Return Page ---------------------------------------------

import shopReturnRoutes  from "./routes/shopAdmin/Return/shopReturnRoutes.js";
// import shopReturnListRoutes from "./routes/shopAdmin/Return/shopReturnListRoute.js"

//  shop-admin checkout page -------------------------
    import checkoutRoutes from "./routes/shopAdmin/Checkout/checkoutRoutes.js";



// add here Shop Order History --------------------------------
import shopOrderHistoryRoutes from "./routes/shopAdmin/OrderHistory/shopOrderHistoryRoutes.js";


import shopAdminRoutes from "./routes/shopAdmin/shopAdminRoutes.js";
import inventoryRoutes from "./routes/shopAdmin/inventoryRoutes.js";
import shopCategoryRoutes from "./routes/shopAdmin/shopCategoryRoutes.js";
import shopProductRoutes from "./routes/shopAdmin/shopProductRoutes.js";
import shopOrderRoutes from "./routes/shopAdmin/shopOrder.routes.js";

import adminTransactionRoutes from "./routes/adminTransactionRoutes.js";
// use for staff
import staffRoutes from "./routes/shopAdmin/staffRoutes.js";


// receipt group id for today 28-02-2026
import shopCheckoutRoutes from "./routes/shopAdmin/Checkout/checkoutRoutes.js";


//  Contact from landingpage bottom =====================
import contactRoutes from "./routes/contact/contactRoutes.js"







const app = express();
const PORT = 5000;
// console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API Key:", process.env.CLOUDINARY_API_KEY);


/* CORS FIX */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// app.use(express.json()); // today is 23-02-2026
app.use(express.json({ limit: "1000mb" }));
// app.use(express.urlencoded({ extended: true }));  // today is 23-02-2026
app.use(express.urlencoded({ extended: true, limit: "1000mb" }));


app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/stores", storeRoutes);

/* SHOP ADMIN ROUTES */

// app.use("/api/shop-admin/booking", shopProductBookRoutes);
app.use("/api/shop-admin/bookings", shopProductBookRoutes);

app.use("/api/cart", shopCartRoutes);

// shopReturnRoutes ------------------------------------

// app.use("/api/returns" , shopReturnRoutes);
// app.use("/api/shop-admin", shopReturnListRoutes);


// shop-admin checkout routes -------------------------
app.use("/api/checkout", checkoutRoutes);



// add here Shop Order History --------------------------------
app.use("/api", shopOrderHistoryRoutes);




app.use("/api/shop-admin", shopAdminRoutes);

app.use("/api/inventory", inventoryRoutes);
app.use("/api/shop_category", shopCategoryRoutes);
app.use("/api/shop_product", shopProductRoutes);
app.use("/api/shop-orders", shopOrderRoutes);




// use for staff
app.use("/api/staff",staffRoutes);

app.use("/api", adminTransactionRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});



// receipt group id for today 28-02-2026

app.use("/api/shop-checkout", shopCheckoutRoutes);


app.use("/api/return", shopReturnRoutes);





// ===============================  Only Admin Reports =========================================

app.use("/api/finance", financeReportRoutes);
app.use("/api/inventory", inventoryReportRoutes);
app.use("/api/transactions", transactionReportRoutes);








// ===============================  Only Admin Reports =========================================



// this is shop-admin profile image upload 
// app.use("/api/shop-admin", auth);

// new added pasword routes ================================

app.use("/api/password", passwordRoutes);


// contact details =======================
app.use("/api/contact", contactRoutes);



// new added -- only UserRequestList --admin heading notification 25-03-2026 --------------------------
app.use ("/api/user_requestlist", userRequestListRoutes)

// shop user Notification --==============================

app.use("/api/shop-user-notification", shopNotificationRoutes);
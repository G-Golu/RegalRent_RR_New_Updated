import mysql from "mysql2";

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "543213",
  database: "regalrent_db",
  // this is most important for date time to work properly
  dateStrings: true,
timezone: "local",
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL database");
  }
});

export default db;























// this is for shareable 


// # ================= DATABASE =================
// DB_HOST=localhost
// DB_USER=root
// DB_PASSWORD=543213
// DB_NAME=regalrent_db

// # ================= SERVER =================
// PORT=5000

// # ================= JWT =================
// JWT_SECRET=your_super_secret_key

// # ================= PAYPAL (if using) =================
// PAYPAL_CLIENT_ID=your_paypal_client_id
// PAYPAL_SECRET=your_paypal_secret

// # ================= STRIPE (if using) =================
// STRIPE_SECRET_KEY=your_stripe_secret_key

// # ================= FRONTEND =================
// CLIENT_URL=http://localhost:3000



















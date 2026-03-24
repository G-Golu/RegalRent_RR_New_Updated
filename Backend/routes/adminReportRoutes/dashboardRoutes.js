import express from "express";
import mysql from "mysql2";
import dbConfig from "../../config/db.js";

const router = express.Router();

router.get("/summary", (req, res) => {

  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error("DB connection error:", err);
      return res.status(500).json({ error: "Database connection failed" });
    }

    connection.query("SELECT COUNT(*) AS total FROM orders", (err, ordersResult) => {
      if (err) {
        connection.end();
        return res.status(500).json(err);
      }

      connection.query("SELECT IFNULL(SUM(total_amount),0) AS totalIncome FROM orders", (err, incomeResult) => {
        if (err) {
          connection.end();
          return res.status(500).json(err);
        }

        res.json({
          summary: {
            orders: ordersResult[0].total,
            totalIncome: incomeResult[0].totalIncome
          },
          monthlySales: []
        });

        connection.end(); //  VERY IMPORTANT
      });
    });
  });

});

export default router;



// import db from "../../config/db.js";

// /* ===============================
//    CREATE BOOKING (SAFE VERSION)
//    Conflict Check + Insert Together
// ================================= */
// export const createBooking = (req, res) => {
//   console.log("BODY:", req.body);

//   const {
//     product_id,
//     user_id,
//     start_date,
//     end_date,
//     total_days,
//     rent_amount,
//     deposit_amount,
//     total_amount,
//     size,
//     customer_name   // new added field for customer name
//   } = req.body;

//   // ✅ Basic validation (IMPORTANT)
//   if (
//     !product_id ||
//     !user_id ||
//     !start_date ||
//     !end_date ||
//     !size
//   ) {
//     return res.status(400).json({
//       message: "Missing required fields"
//     });
//   }

//   // ✅ Safe Date Formatter
//   const formatDate = (date) => {
//     const d = new Date(date);
//     if (isNaN(d.getTime())) return null;
//     return d.toISOString().split("T")[0];
//   };

//   const formattedStart = formatDate(start_date);
//   const formattedEnd = formatDate(end_date);

//   if (!formattedStart || !formattedEnd) {
//     return res.status(400).json({
//       message: "Invalid date format"
//     });
//   }

  

//   // ✅ Overlapping check (same product + same size)
//   const checkSql = `
//     SELECT id FROM shop_product_book
//     WHERE product_id = ?
//     AND size = ?
//     AND status = 'confirmed'
//     AND (? <= end_date AND ? >= start_date)
//   `;

//   db.query(
//     checkSql,
//     [product_id, size, formattedStart, formattedEnd],
//     (err, result) => {
//       if (err) {
//         console.error("CHECK ERROR:", err);
//         return res.status(500).json({
//           message: "Error checking availability",
//           error: err.message
//         });
//       }

//       if (result.length > 0) {
//         return res.status(400).json({
//           message: "Product already booked for selected dates"
//         });
//       }

//       // ✅ Insert booking
//       const insertSql = `
//         INSERT INTO shop_product_book
//         (product_id, user_id,customer_name, start_date, end_date,
//          total_days, rent_amount, deposit_amount,
//          total_amount, size, status)
//         VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')
//       `;

//       db.query(
//         insertSql,
//         [
//           product_id,
//           user_id,
//           customer_name,  // insert customer name into DB
//           formattedStart,
//           formattedEnd,
//           total_days,
//           rent_amount,
//           deposit_amount,
//           total_amount,
//           size
//         ],
//         (err2, insertResult) => {
//           if (err2) {
//             console.error("INSERT ERROR:", err2);
//             return res.status(500).json({
//               message: "Error creating booking",
//               error: err2.message
//             });
//           }

//           return res.status(201).json({
//             message: "Booking Confirmed",
//             bookingId: insertResult.insertId
//           });
//         }
//       );
//     }
//   );
// };
// export const getBookedDates = (req, res) => {
//   const { productId } = req.params;
//   const { size } = req.query; // size query se aayega

//   if (!productId || !size) {
//     return res.status(400).json({
//       message: "Product ID and size are required"
//     });
//   }

//   const sql = `
//     SELECT start_date, end_date
//     FROM shop_product_book
//     WHERE product_id = ?
//     AND size = ?
//     AND status = 'confirmed'
//   `;

//   db.query(sql, [productId, size], (err, results) => {
//     if (err) {
//       console.error("GET BOOKED DATES ERROR:", err);
//       return res.status(500).json({
//         message: "Error fetching booked dates",
//         error: err.message
//       });
//     }

//     res.json(results);
//   });
// };

// /* ===============================
//    GET ALL BOOKINGS (RETURN LIST)
// ================================= */
// // export const getAllBookings = (req, res) => {

// //   const sql = `
// //     SELECT 
// //       spb.id AS booking_id,
// //       spb.end_date AS expected_return_date,
// //       p.name AS product_name,
// //       u.name AS customer_name
// //     FROM shop_product_book spb
// //     LEFT JOIN shop_product p ON p.id = spb.product_id
// //     LEFT JOIN users_new u ON u.id = spb.user_id 
// //     WHERE spb.status = 'confirmed'
// //     ORDER BY spb.id DESC
// //   `;
// // // // here did users = users_new change today 24-02-26
// //   db.query(sql, (err, result) => {

// //     if (err) {
// //       console.error("GET BOOKINGS ERROR:", err);
// //       return res.status(500).json({
// //         message: "Error fetching bookings"
// //       });
// //     }

// //     res.json({
// //       success: true,
// //       data: result
// //     });

// //   });

// // };



// export const getAllBookings = (req, res) => {

//   const sql = `
//     SELECT 
//       spb.id AS booking_id,
//       spb.customer_name,
//       spb.end_date AS expected_return_date,
//       p.name AS product_name
//     FROM shop_product_book spb
//     LEFT JOIN shop_product p ON p.id = spb.product_id
//     WHERE spb.status = 'confirmed'
//     ORDER BY spb.id DESC
//   `;

//   db.query(sql, (err, result) => {

//     if (err) {
//       console.error("GET BOOKINGS ERROR:", err);
//       return res.status(500).json({
//         message: "Error fetching bookings"
//       });
//     }

//     res.json({
//       success: true,
//       data: result
//     });

//   });

// };

// all good , but due to return list page , today 25-02-26 































import db from "../../config/db.js";

/* ===============================
   CREATE BOOKING (TIMEZONE SAFE)
================================= */
export const createBooking = (req, res) => {
  console.log("BODY:", req.body);

  const {
    product_id,
    user_id,
    start_date,
    end_date,
    total_days,
    rent_amount,
    deposit_amount,
    total_amount,
    size,
    customer_name
  } = req.body;

  // ✅ Basic validation
  if (!product_id || !user_id || !start_date || !end_date || !size) {
    return res.status(400).json({
      message: "Missing required fields"
    });
  }

  // ✅ STRICT DATE STRING VALIDATION (NO new Date())
  const cleanDate = (dateStr) => {
    if (!dateStr) return null;
    return dateStr.substring(0, 10); // keeps YYYY-MM-DD only
  };

  const formattedStart = cleanDate(start_date);
  const formattedEnd = cleanDate(end_date);

  if (!formattedStart || !formattedEnd) {
    return res.status(400).json({
      message: "Invalid date format"
    });
  }

  // ✅ Overlapping check
  const checkSql = `
    SELECT id FROM shop_product_book
    WHERE product_id = ?
    AND size = ?
    AND status = 'confirmed'
    AND (? <= end_date AND ? >= start_date)
  `;

  db.query(
    checkSql,
    [product_id, size, formattedStart, formattedEnd],
    (err, result) => {
      if (err) {
        console.error("CHECK ERROR:", err);
        return res.status(500).json({
          message: "Error checking availability"
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Product already booked for selected dates"
        });
      }

      // ✅ Insert booking (NO timezone conversion)
      const insertSql = `
        INSERT INTO shop_product_book
        (product_id, user_id, customer_name, start_date, end_date,
         total_days, rent_amount, deposit_amount,
         total_amount, size, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')
      `;

      db.query(
        insertSql,
        [
          product_id,
          user_id,
          customer_name,
          formattedStart,
          formattedEnd,
          total_days,
          rent_amount,
          deposit_amount,
          total_amount,
          size
        ],
        (err2, insertResult) => {
          if (err2) {
            console.error("INSERT ERROR:", err2);
            return res.status(500).json({
              message: "Error creating booking"
            });
          }

          return res.status(201).json({
            message: "Booking Confirmed",
            bookingId: insertResult.insertId
          });
        }
      );
    }
  );
};


/* ===============================
   GET BOOKED DATES
================================= */
export const getBookedDates = (req, res) => {
  const { productId } = req.params;
  const { size } = req.query;

  if (!productId || !size) {
    return res.status(400).json({
      message: "Product ID and size are required"
    });
  }

  const sql = `
    SELECT start_date, end_date
    FROM shop_product_book
    WHERE product_id = ?
    AND size = ?
    AND status = 'confirmed'
  `;

  db.query(sql, [productId, size], (err, results) => {
    if (err) {
      console.error("GET BOOKED DATES ERROR:", err);
      return res.status(500).json({
        message: "Error fetching booked dates"
      });
    }

    res.json(results);
  });
};


/* ===============================
   GET ALL BOOKINGS (RETURN LIST)
================================= */
export const getAllBookings = (req, res) => {

  const sql = `
    SELECT 
      spb.id AS booking_id,
      spb.customer_name,
      spb.end_date AS expected_return_date,
      p.name AS product_name
    FROM shop_product_book spb
    LEFT JOIN shop_product p ON p.id = spb.product_id
    WHERE spb.status = 'confirmed'
    ORDER BY spb.id DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.error("GET BOOKINGS ERROR:", err);
      return res.status(500).json({
        message: "Error fetching bookings"
      });
    }

    res.json({
      success: true,
      data: result
    });

  });

};



//  new added for book date modify today is 13-03-2026




/* ===============================
   COMPLETE RETURN (FREE DATE)
================================= */
export const completeReturn = (req, res) => {

  const { actual_return_date, product_id, order_id } = req.body;

  if (!actual_return_date || !product_id || !order_id) {
    return res.status(400).json({
      message: "product_id, order_id and actual_return_date required"
    });
  }

  // correct booking find karo using product + order
  const findBooking = `
    SELECT id 
    FROM shop_product_book
    WHERE product_id = ?
    ORDER BY id DESC
    LIMIT 1
  `;

  db.query(findBooking, [product_id], (err, result) => {

    if (err) return res.status(500).json({ message: "DB error" });

    if (!result.length) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const booking_id = result[0].id;

    const updateBooking = `
      UPDATE shop_product_book
      SET end_date = ?
      WHERE id = ?
    `;

    db.query(updateBooking, [actual_return_date, booking_id], (err2) => {

      if (err2) return res.status(500).json({ message: "Booking update failed" });

      const checkoutSql = `
        UPDATE shop_checkout_new
        SET status = 'returned'
        WHERE id = ?
      `;

      db.query(checkoutSql, [order_id], (err3) => {

        if (err3) return res.status(500).json({ message: "Checkout update failed" });

        res.json({
          success: true,
          message: "Return completed and dates freed"
        });

      });

    });

  });

};
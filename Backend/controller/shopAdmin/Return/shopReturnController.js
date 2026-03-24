
// import db from "../../../config/db.js";

// /* ==========================
//    CREATE RETURN
// ========================== */
// export const createReturn = (req, res) => {
//   const {
//     order_id,
//     customer_name,
//     reason,
//     note,
//     refund_method,
//     final_refund,
//     products,
//   } = req.body;

//   if (!order_id || !reason || !products || !products.length) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing required fields",
//     });
//   }

//   let completed = 0;
//   let hasError = false;

//   products.forEach((p) => {
//     const query = `
//   INSERT INTO shop_returnlist_table
//   (
//     order_id,
//     customer_name,
//     product_id,
//     product_name,
//     deposit_amount,
//     rent_amount,
//     days,
//     return_date,
//     status,
//     reason,
//     note,
//     refund_method,
//     total_refund_amount
//   )
//   VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?)
// `;

//     const returnDate = p.return_date ?? p.end_date ?? null;

//     db.query(
//       query,
//       [
//         order_id,
//         customer_name || null,
//         p.product_id,
//           p.product_name, 
//         p.deposit_amount ?? 0,
//         p.rent_amount ?? 0,
//         p.days ?? 1,
//         returnDate,
//         reason,
//         note ?? "",
//         refund_method ?? "original",
//         final_refund ?? 0,
//       ],
//       (err) => {
//         if (err && !hasError) {
//           hasError = true;
//           console.error("Return Insert Error:", err);
//           return res.status(500).json({
//             success: false,
//             message: "Failed to insert return",
//           });
//         }

//         completed++;

//         if (completed === products.length && !hasError) {
//           return res.status(201).json({
//             success: true,
//             message: "Return created successfully",
//           });
//         }
//       }
//     );
//   });
// };

// /* ==========================
//    GET RETURN LIST
// ========================== */
// export const getReturnList = (req, res) => {
//   const query = `
//     SELECT *
//     FROM shop_returnlist_table
//     ORDER BY id DESC
//   `;

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Return List Error:", err);
//       return res.status(500).json({
//         success: false,
//         message: "Server Error",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: results,
//     });
//   });
// };


// // /* ==========================
// //    COMPLETE RETURN
// // ========================== */
// export const completeReturn = (req, res) => {
//   const { id } = req.body;

//   if (!id) {
//     return res.status(400).json({
//       success: false,
//       message: "Return ID required",
//     });
//   }

//   const query = `
//     UPDATE shop_returnlist_table
//     SET status = 'returned'
//     WHERE id = ?
//   `;

//   db.query(query, [id], (err) => {
//     if (err) {
//       console.error("Complete Return Error:", err);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to complete return",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Return marked as returned successfully",
//     });
//   });
// };
// // no issue

// comment for inventory report today is : 05-03-2026















import db from "../../../config/db.js";

/* ==========================
   CREATE RETURN
========================== */
export const createReturn = (req, res) => {
  const {
    order_id,
    customer_name,
    reason,
    note,
    actual_return_date,
    refund_method,
    final_refund,
    products,
  } = req.body;

  if (!order_id || !reason || !products || !products.length) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  let completed = 0;
  let hasError = false;

  products.forEach((p) => {
    const query = `
INSERT INTO shop_returnlist_table
(
order_id,
customer_name,
product_id,
product_name,
deposit_amount,
rent_amount,
days,
return_date,
status,
reason,
note,
actual_return_date,
refund_method,
total_refund_amount
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?)
`;

    const returnDate = p.return_date ?? p.end_date ?? null;

    db.query(
      query,
      [
        order_id,
        customer_name || null,
        p.product_id,
        p.product_name,
        p.deposit_amount ?? 0,
        p.rent_amount ?? 0,
        p.days ?? 1,
        returnDate,
        reason,
        note ?? "",
        actual_return_date,
        refund_method ?? "original",
        final_refund ?? 0,
      ],
      (err) => {
        if (err && !hasError) {
          hasError = true;
          console.error("Return Insert Error:", err);
          return res.status(500).json({
            success: false,
            message: "Failed to insert return",
          });
        }

        completed++;

        if (completed === products.length && !hasError) {
          return res.status(201).json({
            success: true,
            message: "Return created successfully",
          });
        }
      }
    );
  });
};




/* ==========================
   GET RETURN LIST
========================== */
export const getReturnList = (req, res) => {
  const query = `
    SELECT *
    FROM shop_returnlist_table
    ORDER BY id DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Return List Error:", err);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }

    return res.status(200).json({
      success: true,
      data: results,
    });
  });
};

/* ==========================
   COMPLETE RETURN
========================== */
export const completeReturn = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Return ID required",
    });
  }

  // Step 1: Get product_id from return table

  // const getProductQuery = `
  //   SELECT product_id
  //   FROM shop_returnlist_table
  //   WHERE id = ?
  // `;
  // this is comment for inventory report make dynamic 


const getProductQuery = `
   SELECT product_id, order_id
FROM shop_returnlist_table
WHERE id = ?
`;


  

  db.query(getProductQuery, [id], (err, result) => {
    if (err) {
      console.error("Fetch Product Error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch product",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: "Return record not found",
      });
    }

    const productId = result[0].product_id;

    // Step 2: Mark return as completed
    const updateReturnQuery = `
      UPDATE shop_returnlist_table
      SET status = 'returned'
      WHERE id = ?
    `;

    db.query(updateReturnQuery, [id], (err2) => {
      if (err2) {
        console.error("Complete Return Error:", err2);
        return res.status(500).json({
          success: false,
          message: "Failed to complete return",
        });
      }

      // Step 3: Increase stock
      const updateStockQuery = `
        UPDATE shop_product
        SET stock = stock + 1
        WHERE id = ?
      `;

      db.query(updateStockQuery, [productId], (err3) => {
        if (err3) {
          console.error("Stock Update Error:", err3);
          return res.status(500).json({
            success: false,
            message: "Failed to update stock",
          });
        }

       // Step 4: Update checkout status   / use for inventory module report dynamic
const updateCheckout = `
UPDATE shop_checkout_new
SET status = 'returned'
WHERE order_id = ? AND product_id = ?
`;

db.query(updateCheckout, [result[0].order_id, productId], (err4) => {
  if (err4) {
    console.error("Checkout Update Error:", err4);
  }

  return res.status(200).json({
    success: true,
    message: "Return completed and stock updated",
  });
});
        });
      });
    });
};

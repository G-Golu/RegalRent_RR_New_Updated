

import db from "../config/db.js";
import bcrypt from "bcryptjs";
import sendEmail from "../AddStoreEmail/SendEmail.js";
import { insertNotification } from "./ShopUserNotification/shopNotificationController.js";

/* ================= CREATE STORE ================= */
export const createStore = (req, res) => {

  const {
    name,
    email,
    mobile,
    password,
    address,
    package_id,
    bank_name,
    account_no,
    account_holder,
    ifsc_code
  } = req.body;

  /* ===== HANDLE CATEGORIES ===== */
  let categories = [];

  if (req.body.categories) {
    try {

      let parsed = req.body.categories;

      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }

      if (Array.isArray(parsed)) {
        categories = parsed.flat(Infinity); // remove nested arrays
      }

    } catch {
      categories = [];
    }
  }

 const logo = req.file
  ? `/uploads/logos/${req.file.filename}`
  : null;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password required"
    });
  }

  db.query(
    "SELECT id FROM users_new WHERE email=?",
    [email],
    (err, existing) => {

      if (err) return res.status(500).json(err);

      if (existing.length > 0) {
        return res.status(400).json({
          success: false,
          message: "User already exists"
        });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {

        if (err) return res.status(500).json(err);

        db.query(
          `INSERT INTO users_new (name,email,password,role_id)
           VALUES (?,?,?,?)`,
          [name, email, hashedPassword, 2],
          (err, userResult) => {

            if (err) return res.status(500).json(err);

            const user_id = userResult.insertId;

            db.query(
              `INSERT INTO stores
              (user_id,name,email,mobile,address,package_id,categories,logo,
               bank_name,account_no,account_holder,ifsc_code)
              VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
              [
                user_id,
                name,
                email,
                mobile,
          
                address,
                package_id,
                JSON.stringify(categories),
                logo,
                bank_name,
                account_no,
                account_holder,
                ifsc_code
              ],
          async (err) => {
  if (err) return res.status(500).json(err);

  try {

    /* ===== USER EMAIL ===== */
    await sendEmail(
      email,
      "Store Created Successfully 🎉",
      `
      <h2>Dear ${name}, 🎉 Congratulations! </h2>
      <p>Your store has been successfully created !.</p>
      <p>We are delighted to welcome you as a member of RegalRental. Wishing you a bright and successful future. Thank you!   </p>

      <h3>Login Details:</h3>
      <p><b>Email:</b> ${email}</p>
      <p><b>Password:</b> ${password}</p>

      <p>Thank you for joining us 🚀</p>
      `
    );

    /* ===== ADMIN EMAIL ===== */
    await sendEmail(
  process.env.ADMIN_EMAIL,
  "New Store Created 🚀",
  `
  <h2>New Store Details</h2>

  <p><b>Name:</b> ${name}</p>
  <p><b>Email:</b> ${email}</p>
  <p><b>Mobile:</b> ${mobile}</p>
  <p><b>Package ID:</b> ${package_id}</p>
  <p><b>Categories:</b> ${categories.join(", ")}</p>

  <hr/>

  <h3>Bank Details</h3>
  <p>Bank: ${bank_name || "-"}</p>
  <p>Account No: ${account_no || "-"}</p>
  <p>Holder: ${account_holder || "-"}</p>
  <p>IFSC: ${ifsc_code || "-"}</p>
  `
);


 // new added for shop_user_get notification ==  No need can eaisy to delete this part ===================================

  /* ===== INSERT NOTIFICATION ===== */
  // ✅ Make sure user_id is defined BEFORE this point
  const message = `
Welcome ${name}! 🎉  
Your store "${name}" has been created successfully.
`;

// INSERT NOTIFICATION
insertNotification(user_id, `Welcome ${name}! Your store "${name}" has been created successfully.`);






  } catch (mailErr) {
    console.error("Email Error:", mailErr);
  }

  res.status(201).json({
    success: true,
    message: "Store created + email sent"
  });

              }
            );

          }
        );

      });

    }
  );

};


/* ================= GET STORES ================= */
export const getStores = (req, res) => {

  db.query(
    `SELECT stores.*, package_create.days
     FROM stores
     LEFT JOIN package_create
     ON stores.package_id = package_create.id`,
    async (err, rows) => { // make callback async for await
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      const today = new Date();

      const activeStoreIds = [];
      const inactiveStoreIds = [];

           // Track reminder emails
      const reminderEmailsSent = [];

      // Use for..of to allow async email sending
      for (const store of rows) {

        /* ===== CATEGORY PARSE ===== */
        try {
          if (store.categories && typeof store.categories === "string") {
            store.categories = JSON.parse(store.categories);
          }
          if (Array.isArray(store.categories)) {
            store.categories = store.categories.flat(Infinity);
          } else {
            store.categories = [];
          }
        } catch {
          store.categories = [];
        }

        /* ===== PACKAGE EXPIRY CHECK ===== */
        if (store.days && store.created_at) {

          const created = new Date(store.created_at);
          const expiry = new Date(created);
          expiry.setDate(expiry.getDate() + Number(store.days));

          const diffDays = Math.ceil(
            (expiry.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
          );

          if (diffDays <= 0) {
            store.package_status = "Inactive";
            inactiveStoreIds.push(store.id);
          } else if (diffDays <= 7) {
            store.package_status = `${diffDays} days left`;
            activeStoreIds.push(store.id);
          } else {
            store.package_status = "Active";
            activeStoreIds.push(store.id);
          }

  /* ===== SEND REMINDER EMAIL ===== */
const todayDate = new Date().toISOString().split("T")[0];

const lastSent = store.last_reminder_sent
  ? new Date(store.last_reminder_sent).toISOString().split("T")[0]
  : null;

try {

 if (diffDays <= 10 && diffDays >= 0) {

  db.query(
    "UPDATE stores SET last_reminder_sent=? WHERE id=? AND (last_reminder_sent IS NULL OR DATE(last_reminder_sent) != ?)",
    [todayDate, store.id, todayDate],
    (err, result) => {

      if (err) return console.error(err);

      if (result.affectedRows > 0) {

        sendEmail(
          store.email,
          diffDays === 0 ? "Package Expired" : "Package Expiry Reminder ⚠️",
          diffDays === 0
            ? `<p>Dear ${store.name},</p>
               <p>Your package has expired today.</p>`
            : `<p>Dear ${store.name},</p>
               <p>Your package will expire in <b>${diffDays} day(s)</b>.</p>`
        ).catch(err => console.error("Mail error:", err));
  // ADD NOTIFICATION HERE
        insertNotification(store.user_id, `Your package will expire in ${diffDays} day(s).`);
      
        reminderEmailsSent.push({
          store: store.name,
          email: store.email,
          type: diffDays === 0 ? "Expired" : "Reminder"
        });
      }
    }
  );

}




} catch (mailErr) {
  console.error("Reminder Email Error:", mailErr);
}
        }
      }

      /* ===== UPDATE DATABASE STATUS ===== */
      if (inactiveStoreIds.length > 0) {
        db.query(
          `UPDATE stores SET status=0 WHERE id IN (?)`,
          [inactiveStoreIds],
          (err) => {
            if (err) console.error("Inactive update error:", err);
          }
        );
      }

      if (activeStoreIds.length > 0) {
        db.query(
          `UPDATE stores SET status=1 WHERE id IN (?)`,
          [activeStoreIds],
          (err) => {
            if (err) console.error("Active update error:", err);
          }
        );
      }

      res.json({
        stores: rows,
        reminderEmailsSent, // ✅ This tells you exactly who got the emails
        totalReminders: reminderEmailsSent.length
      });

    }
  );


 };


/* ================= UPDATE STORE ================= */

export const updateStore = (req, res) => {

  const { id } = req.params;

  const {
    name,
    email,
    password,
    mobile,
    address,
    package_id,
    bank_name,
    account_no,
    account_holder,
    ifsc_code
  } = req.body;

  let categories = [];

  if (req.body.categories) {
    try {
      let parsed = req.body.categories;

      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }

      if (Array.isArray(parsed)) {
        categories = parsed.flat(Infinity);
      }

    } catch {
      categories = [];
    }
  }

  const logo = req.file
    ? `/uploads/logos/${req.file.filename}`
    : null;

  // ✅ Step 1: Get user_id from store
  db.query(
    // "SELECT user_id FROM stores WHERE id=?",
    "SELECT stores.*, users_new.email AS user_email, users_new.name AS user_name FROM stores LEFT JOIN users_new ON stores.user_id = users_new.id WHERE stores.id=?",
    [id],
    (err, result) => {

      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({ message: "Store not found" });
      }

      // const user_id = result[0].user_id;
      const oldData = result[0];   // ✅ YE LINE ADD KARO
const user_id = oldData.user_id;

      // ✅ Step 2: Update users_new
      const updateUser = () => {

        let userSql = "UPDATE users_new SET name=?, email=?";
        let userValues = [name, email];

        if (password) {
          bcrypt.hash(password, 10, (err, hashedPassword) => {

            if (err) return res.status(500).json(err);

            userSql += ", password=?";
            userValues.push(hashedPassword);

            userSql += " WHERE id=?";
            userValues.push(user_id);

            db.query(userSql, userValues, updateStoreTable);
          });

        } else {
          userSql += " WHERE id=?";
          userValues.push(user_id);

          db.query(userSql, userValues, updateStoreTable);
        }
      };

      // ✅ Step 3: Update store
     const updateStoreTable = (err) => {

  if (err) return res.status(500).json(err);

  let sql = `
    UPDATE stores SET
    name=?,
    email=?,
    mobile=?,
    address=?,
    package_id=?,
    categories=?,
    bank_name=?,
    account_no=?,
    account_holder=?,
    ifsc_code=?
  `;

  const values = [
    name,
    email,
    mobile,
    address,
    package_id,
    JSON.stringify(categories),
    bank_name,
    account_no,
    account_holder,
    ifsc_code
  ];

  if (logo) {
    sql += ", logo=?";
    values.push(logo);
  }

  sql += " WHERE id=?";
  values.push(id);

  db.query(sql, values, (err) => {
    let changes = [];

if (oldData.name !== name) {
  changes.push(`Name: ${oldData.name} → ${name}`);
}

if (oldData.email !== email) {
  changes.push(`Email: ${oldData.email} → ${email}`);
}

if (oldData.mobile !== mobile) {
  changes.push(`Mobile: ${oldData.mobile} → ${mobile}`);
}

if (oldData.address !== address) {
  changes.push(`Address updated`);
}

if (password) {
  changes.push(`Password updated`);
}

if (oldData.package_id != package_id) {
  changes.push(`Package: ${oldData.package_id} → ${package_id}`);
}

let changeHtml = changes.length
  ? `<ul>${changes.map(c => `<li>${c}</li>`).join("")}</ul>`
  : "<p>No major changes</p>";


    if (err) return res.status(500).json(err);

    (async () => {
      try {
        await sendEmail(
  email,
  "Store Updated ✏️",
  `
  <h2>Hi ${name}</h2>

  <p>Your account details have been updated.</p>

  <h3>Updated Details:</h3>
  ${changeHtml}

  <p>If you did not make this change, please contact support.</p>
  `
);

        // await sendEmail(
        //   process.env.ADMIN_EMAIL,
        //   "Store Updated",
        //   `<p>Store updated: ${name} (${email})</p>`
        // );

        await sendEmail(
  process.env.ADMIN_EMAIL,
  "Store Updated",
  `
  <p>Store updated: ${name} (${email})</p>
  <h4>Changes:</h4>
  ${changeHtml}
  `
);

      } catch (e) {
        console.log("Mail error:", e);
      }

      res.json({
        success: true,
        message: "Store & User Updated Successfully + email sent"
      });
    })();
  });
};
// INSERT NOTIFICATION
insertNotification(user_id, `Your store "${name}" details have been updated.`);

// ✅ YAHI PE CALL HOGA
updateUser();
    
}
  );
};

  

/* ================= DELETE STORE ================= */
export const deleteStore = (req, res) => {

  const storeId = req.params.id;

  db.query(
    "SELECT user_id, email, name FROM stores WHERE id = ?",
    [storeId],
    (err, store) => {

      if (err) return res.status(500).json(err);

      if (store.length > 0) {

        const { user_id, email, name } = store[0];

        db.query("DELETE FROM users_new WHERE id = ?", [user_id]);

        db.query(
          "DELETE FROM stores WHERE id=?",
          [storeId],
          async (err) => {

            if (err) return res.status(500).json(err);

            try {

              // USER EMAIL
              await sendEmail(
                email,
                "Store Deleted ",
                `<p>Hi ${name}, your store has been deleted.</p>`
              );

              // ADMIN EMAIL
              await sendEmail(
                process.env.ADMIN_EMAIL,
                "Store Deleted",
                `<p>Deleted: ${name} (${email})</p>`
              );
// INSERT NOTIFICATION
insertNotification(user_id, `Your store "${name}" has been deleted.`);
            } catch (e) {
              console.log(e);
            }

            res.json({
              success: true,
              message: "Store and user deleted + email sent"
            });

          }
        );
      }
    }
  );
  };




 
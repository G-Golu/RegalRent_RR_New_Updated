
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import db from "../config/db.js";

// /* ================= REGISTER ================= */
// export const register = (req, res) => {
//   let { name, email, password, role } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   email = email.toLowerCase();
//   role = role || "user";

//   // check existing user
//   db.query(
//     "SELECT id FROM users_new WHERE email = ?",
//     [email],
//     async (err, existing) => {
//       if (err) {
//         console.error("REGISTER ERROR:", err);
//         return res.status(500).json({ message: "Server error" });
//       }

//       if (existing.length > 0) {
//         return res.status(400).json({ message: "User already exists" });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);

//       db.query(
//         `INSERT INTO users_new (name, email, password, role_id)
//          VALUES (?, ?, ?, ?)`,
//         [
//           name,
//           email,
//           hashedPassword,
//           role === "admin"
//             ? 1
//             : role === "shop-admin"
//             ? 2
//             : 3,
//         ],
//         (err) => {
//           if (err) {
//             console.error("REGISTER ERROR:", err);
//             return res.status(500).json({ message: "Server error" });
//           }

//           res.status(201).json({
//             message: "User registered successfully",
//           });
//         }
//       );
//     }
//   );
// };

// /* ================= LOGIN ================= */
// export const login = (req, res) => {
//   let { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password required" });
//   }

//   email = email.toLowerCase();

//   const sql = `
//     SELECT 
//         u.id,
//         u.name,
//         u.email,
//         u.password,
//         r.name AS role
//     FROM users_new u
//     JOIN roles r ON u.role_id = r.id
//     WHERE u.email = ?
//   `;

//   db.query(sql, [email], async (err, users) => {
//     if (err) {
//       console.error("LOGIN ERROR:", err);
//       return res.status(500).json({ message: "Server error" });
//     }

//     if (users.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Invalid email or password" });
//     }

//     const user = users[0];

//     const isMatch = await bcrypt.compare(
//       password,
//       user.password
//     );

//     if (!isMatch) {
//       return res
//         .status(400)
//         .json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       process.env.JWT_SECRET || "secret123",
//       { expiresIn: "7d" }
//     );

//     res.json({
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//           .toLowerCase()
//           .replace(" ", "-"),
//       },
//     });
//   });
// };


// comment for expired user can't do login , today is : 09-03-2026
























import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

/* ================= REGISTER ================= */

export const register = (req, res) => {
  let { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  email = email.toLowerCase();
  role = role || "user";

  db.query(
    "SELECT id FROM users_new WHERE email = ?",
    [email],
    async (err, existing) => {
      if (err) {
        console.error("REGISTER ERROR:", err);
        return res.status(500).json({ message: "Server error" });
      }

      if (existing.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        `INSERT INTO users_new 
        (name, email, password, role_id, manual_status, status)
        VALUES (?, ?, ?, ?, 'active', 'active')`,
        [
          name,
          email,
          hashedPassword,
          role === "admin"
            ? 1
            : role === "shop-admin"
            ? 2
            : 3,
        ],
        (err) => {
          if (err) {
            console.error("REGISTER ERROR:", err);
            return res.status(500).json({ message: "Server error" });
          }

          res.status(201).json({
            message: "User registered successfully",
          });
        }
      );
    }
  );
};

/* ================= LOGIN ================= */

export const login = (req, res) => {

  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  email = email.toLowerCase();

  const sql = `
    SELECT 
        u.id,
        u.name,
        u.email,
        u.password,
        u.status,
        u.manual_status,
        r.name AS role,
          u.profile_image  
    FROM users_new u
    JOIN roles r ON u.role_id = r.id
    WHERE u.email = ?
  `;
  //  u.profile_image   -- add this for save profile image

  db.query(sql, [email], async (err, users) => {

    if (err) {
      console.error("LOGIN ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = users[0];

    /* ===== MANUAL STATUS CHECK ===== */

    if (user.manual_status === "inactive") {
      return res.status(403).json({
        message: "Your account has been disabled by admin.",
      });
    }

    /* ===== PASSWORD CHECK ===== */

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const requiresStore = user.role.toLowerCase() !== "user";

    /* ===== NORMAL USER LOGIN ===== */

    if (!requiresStore) {

      if (user.status !== "active") {
        return res.status(403).json({
          message: "Your account is inactive.",
        });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "secret123",
        { expiresIn: "7d" }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.toLowerCase().replace(" ", "-"),
            profile_image: user.profile_image || "",  // include profile_image
        },
      });

    }

    /* ===== STORE CHECK ===== */

    db.query(
      // `SELECT s.created_at, s.status, p.days 26-03-2026
      `SELECT s.created_at, s.status, p.days, p.status AS package_status
       FROM stores s
       LEFT JOIN package_create p
       ON s.package_id = p.id
       WHERE s.user_id = ?`,
      [user.id],
      (err, stores) => {

        if (err) {
          console.error("STORE CHECK ERROR:", err);
          return res.status(500).json({ message: "Server error" });
        }

        if (!stores || stores.length === 0) {
          return res.status(403).json({
            message: "No store found for this user. Contact admin.",
          });
        }

        const store = stores[0];
        console.log("STORE DATA:", store);
        // 🔴 PACKAGE DISABLED CHECK -- 26-3-2026
// if (store.package_status === 0) {
//   return res.status(403).json({
//     message: "Your package has been disabled by admin.",
//   });
// }
// console.log("STORE STATUS:", store.status, typeof store.status);
//         // if (store.status === 0) { 26-03-2026 , comment for block after package expired
//         if (store.status === 0) {
//           return res.status(403).json({
//             message: "Your store is inactive. Contact admin.",
//           });
//         }
        


// 🔴 STORE DISABLED (manual)
if (store.status === 0) {
  return res.status(403).json({
    message: "Your store is inactive. Contact admin.",
  });
}

// 🔴 PACKAGE DISABLED
if (store.package_status === 0) {
  return res.status(403).json({
    message: "Your package has been disabled by admin.",
  });
}

// 🔴 PACKAGE EXPIRY CHECK
if (store.created_at && store.days !== null) {

  const created = new Date(store.created_at);
  const expiry = new Date(created);
  expiry.setDate(created.getDate() + Number(store.days));

  const today = new Date();

  if (today > expiry) {
    return res.status(403).json({
      message: "Your package has expired. Please renew.",
    });
  }
}




        /* ===== PACKAGE EXPIRY CHECK ===== */

        if (store.days && store.created_at) {

          const created = new Date(store.created_at);
          const expiry = new Date(created);

          expiry.setDate(created.getDate() + Number(store.days));

          const today = new Date();

          if (today > expiry) {
            return res.status(403).json({
              message: "Your package has expired. Please renew.",
            });
          }

        }

        /* ===== LOGIN SUCCESS ===== */

        const token = jwt.sign(
          
          { id: user.id, role: user.role },
          process.env.JWT_SECRET || "secret123",
          { expiresIn: "7d" }
          
        );

        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role.toLowerCase().replace(" ", "-"),
             profile_image: user.profile_image || "",
          },
        });

      }
    );

  });

};


/* ================= UPDATE PROFILE Admin ================= */






//  new added for shop-admin profile image upload and retrive ===========================================
// today is : 10-03-2026






/* ================= UPDATE PROFILE IMAGE ================= */
export const updateProfileImage = (req, res) => {
  const { userId, profile_image } = req.body;
  if (!userId || !profile_image)
    return res.status(400).json({ message: "userId and profile_image required" });

  const sql = "UPDATE users_new SET profile_image = ? WHERE id = ?";

  db.query(sql, [profile_image, userId], (err) => {
    if (err) {
      console.error("UPDATE PROFILE IMAGE ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    // After update, fetch the updated user
    db.query(
      "SELECT id, name, email, role_id, profile_image FROM users_new WHERE id = ?",
      [userId],
      (err, results) => {
        if (err) {
          console.error("FETCH UPDATED PROFILE ERROR:", err);
          return res.status(500).json({ message: "Server error" });
        }

        return res.json(results[0]);
      }
    );
  });
};


/* ================= GET PROFILE ================= */


export const getProfile = (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ message: "userId required" });

  const sql = `
    SELECT u.id, u.name, u.email, r.name AS role, u.profile_image
    FROM users_new u
    JOIN roles r ON u.role_id = r.id
    WHERE u.id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("GET PROFILE ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (!results || results.length === 0) return res.status(404).json({ message: "User not found" });

    res.json(results[0]);
  });
};







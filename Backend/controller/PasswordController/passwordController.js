import bcrypt from "bcrypt";
import crypto from "crypto";
import db from "../../config/db.js";
import nodemailer from "nodemailer";

/* =================== EMAIL SETUP =================== */

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ================= FORGOT PASSWORD ================= */

export const forgotPassword = (req, res) => {
  const { email } = req.body;

  db.query(
    "SELECT id,email FROM users_new WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.json({ message: "Email not found", success: false });
      }

      const token = crypto.randomBytes(32).toString("hex");
      const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      db.query(
        "UPDATE users_new SET reset_token=?, reset_token_expiry=? WHERE email=?",
        [token, expiry, email],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to save token" });
          }

          const resetLink = `http://localhost:5173/reset-password/${token}`;

          // SEND EMAIL
          transporter.sendMail(
            {
              from: `"My App" <${process.env.EMAIL_USER}>`,
              to: email,
              subject: "Password Reset Request",
              html: `
                <p>Hello,</p>
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>This link will expire in 15 minutes.</p>
              `,
            },
            (err, info) => {
              if (err) {
                console.error(err);
                return res
                  .status(500)
                  .json({ message: "Failed to send email", success: false });
              }

              res.json({
                message: "Reset link sent to your email",
                success: true,
              });
            }
          );
        }
      );
    }
  );
};

/* ================= RESET PASSWORD ================= */

export const resetPassword = (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  db.query(
    "SELECT id, reset_token_expiry FROM users_new WHERE reset_token=?",
    [token],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.json({ message: "Invalid token", success: false });
      }

      const user = results[0];
      if (new Date() > new Date(user.reset_token_expiry)) {
        return res.json({ message: "Token expired", success: false });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: "Hashing failed" });
        }

        db.query(
          "UPDATE users_new SET password=?, reset_token=NULL, reset_token_expiry=NULL WHERE reset_token=?",
          [hashedPassword, token],
          (err) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ message: "Password update failed", success: false });
            }

            res.json({
              message: "Password updated successfully",
              success: true,
            });
          }
        );
      });
    }
  );
};
import db from "../../config/db.js";
import cloudinary from "../../config/cloudinary.js";
import streamifier from "streamifier";

/* ================= GET PROFILE ================= */
export const getProfile = async (req, res) => {
  try {
    const userId = 13; // temporary

    const [rows] = await db.query(
      "SELECT name, profile_image FROM users_new WHERE id=?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: rows[0].name,
      avatar: rows[0].profile_image, // frontend expects avatar
    });

  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= UPDATE PROFILE ================= */
export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = 13; // temporary

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const [rows] = await db.query(
      "SELECT profile_image, avatar_public_id FROM users_new WHERE id=?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    let profileImage = rows[0].profile_image;
    let avatarPublicId = rows[0].avatar_public_id;

    if (req.file && req.file.buffer) {

      if (avatarPublicId) {
        await cloudinary.uploader.destroy(avatarPublicId);
      }

      const uploadFromBuffer = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "shop-admin" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          streamifier.createReadStream(buffer).pipe(stream);
        });
      };

      const result = await uploadFromBuffer(req.file.buffer);

      profileImage = result.secure_url;
      avatarPublicId = result.public_id;
    }

    await db.query(
      "UPDATE users_new SET name=?, profile_image=?, avatar_public_id=? WHERE id=?",
      [name, profileImage, avatarPublicId, userId]
    );

    res.json({
      message: "Profile updated successfully",
      name,
      avatar: profileImage,
    });

  } catch (err) {
    console.error("PROFILE UPDATE ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

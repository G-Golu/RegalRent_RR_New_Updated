// everything is ok

import { useState, useEffect } from "react";
import "../Shop-Admin_Profile/ShopProfile.css";

/* ================= CLOUDINARY ================= */
const CLOUD_NAME = "dypfnsw0l";
const UPLOAD_PRESET = "profile_upload";
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

/* ================= BACKEND API ================= */
const API_URL = "http://localhost:5000/api/auth/update-profile-image";

const Profile = () => {
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [progress, setProgress] = useState(0);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser(savedUser);
  }, []);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* ================= SAVE PROFILE ================= */
  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(user));
    window.dispatchEvent(new CustomEvent("userUpdated", { detail: user.avatar }));
    setEdit(false);
  };

  /* ================= IMAGE UPLOAD ================= */
  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", UPLOAD_URL);

    // Upload Progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgress(percent);
      }
    };

    xhr.onload = async () => {
      const data = JSON.parse(xhr.responseText);
      const imageUrl = data.secure_url;

      try {
        // Save image in backend DB
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            profile_image: imageUrl // must match backend field
          }),
          credentials: "include"
        });

        const updatedData = await res.json();

        // Update local state and localStorage
        const updatedUser = {
          ...user,
          avatar: updatedData.profile_image || imageUrl
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Dispatch event so Header updates immediately
        window.dispatchEvent(
          new CustomEvent("userUpdated", { detail: updatedUser.avatar })
        );
      } catch (error) {
        console.error("DB update error:", error);
      }

      setProgress(0);
    };

    xhr.send(fd);
  };

  return (
    <div className="profile-page">
      <div className="profile-page-header">
        <h1 className="profile-title">My Profile</h1>
        <p className="profile-subtitle">
          Manage your personal information and profile picture
        </p>
      </div>

      <div className="profile-card">
        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar-wrapper">
            {user?.avatar ? (
              <img src={user.avatar} alt="profile" />
            ) : (
              <div className="avatar-placeholder">
                {user?.name?.charAt(0) || "A"}
              </div>
            )}

            {edit && (
              <label className="avatar-upload">
                ✎
                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadImage}
                  hidden
                />
              </label>
            )}
          </div>

          {/* Upload Progress */}
          {progress > 0 && (
            <div className="upload-container">
              <p className="upload-text">Uploading... Please wait</p>
              <div className="upload-bar">
                <div
                  className="upload-progress"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>

        {/* BODY */}
        <div className="profile-body">
          <div className="input-group">
            <label>Full Name</label>
            <input
              name="name"
              value={user?.name || ""}
              onChange={handleChange}
              disabled={!edit}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input value={user?.email || ""} disabled />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              name="phone"
              value={user?.phone || ""}
              onChange={handleChange}
              disabled={!edit}
            />
          </div>

          <div className="input-group">
            <label>Role</label>
            <input value={user?.role || ""} disabled />
          </div>

          <div className="btn-group">
            {!edit ? (
              <button className="btn-primary" onClick={() => setEdit(true)}>
                Edit Profile
              </button>
            ) : (
              <>
                <button className="btn-cancel" onClick={() => setEdit(false)}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={saveProfile}>
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
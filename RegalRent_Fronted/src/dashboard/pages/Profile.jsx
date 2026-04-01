
import { useState } from "react";
import "./profile.css";
import axios from "axios";


const CLOUDINARY_UPLOAD_PRESET = "profile_upload";
const CLOUDINARY_CLOUD_NAME = "dypfnsw0l";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;


// this is admin profile image -------
const updateProfileImageApi = (data) => {
  return axios.post("http://localhost:5000/api/auth/update-profile-image", data);
};


const Profile = () => {
 const [user, setUser] = useState(() => {
  return JSON.parse(localStorage.getItem("user")) || {
    name: "",
    email: "",
    phone: "",
    role: "",
    profile_image: "",
  };
});

 

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // new progress state

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    window.dispatchEvent(new Event("userUpdated"));
    setEditing(false);
    alert("Profile updated successfully!");
  };

 const handleCancel = () => {
  const latestUser =
    JSON.parse(localStorage.getItem("user")) || user;

  setUser(latestUser);
  setEditing(false);
};

 const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    setLoading(true);
    setProgress(0);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", CLOUDINARY_URL);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgress(percent);
      }
    };

   xhr.onload = async () => {
  const data = JSON.parse(xhr.responseText);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const updatedUser = {
    ...storedUser,
    profile_image: data.secure_url,
  };

  // ✅ SAVE IN DB (CORRECT API)
  await updateProfileImageApi({
    userId: storedUser.id,
    profile_image: data.secure_url,
  });

  // ✅ SAVE LOCAL
  localStorage.setItem("user", JSON.stringify(updatedUser));
  setUser(updatedUser);

  window.dispatchEvent(new Event("userUpdated"));

  alert("Image uploaded & saved permanently!");

  setLoading(false);
  setProgress(0);
};

    xhr.onerror = () => {
      alert("Upload failed");
      setLoading(false);
      setProgress(0);
    };

    xhr.send(formData);

  } catch (error) {
    console.error(error);
    setLoading(false);
    setProgress(0);
  }
};

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your account details</p>
      </div>

      <div className="profile-card">
        {/* <div className="profile-avatar-section"> */}
        <div className="profile-top">
          <img
  src={user.profile_image || "/user-icon.png"}
 onError={(e) => {
  if (e.target.src !== window.location.origin + "/user-icon.png") {
    e.target.src = "/user-icon.png";
  }
}}
  alt="Profile"
  className="profile-avatar"
/>

          {editing && (
            <label className="avatar-upload-label">
              {loading ? "Uploading..." : "Change Image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={loading}
                className="avatar-input"
              />
            </label>
          )}

          {/* ===== UPLOAD PROGRESS BAR ===== */}
          {loading && (
            <div className="upload-container">
              <p className="upload-text">Uploading... {progress}%</p>
              <div className="upload-bar">
                <div
                  className="upload-progress"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="profile-form">
          <div className="profile-row">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div className="profile-row">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div className="profile-row">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div className="profile-row">
            <label>Role</label>
            <input type="text" value={user.role} disabled />
          </div>

          <div className="profile-actions">
            {!editing ? (
              <button className="btn-primary" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  className="btn-outline"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={handleSave}
                  disabled={loading}
                >
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
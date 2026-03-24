import { useState } from "react";
import { useTheme } from "../../context/ThemeContext.jsx";
import "./setting.css";

const Settings = () => {

  const { theme, setTheme, fontSize, setFontSize, accent, setAccent } = useTheme();

  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="settings-wrapper">

      <h1 className="settings-title">⚙️ Admin Settings</h1>

      {/* SETTINGS NAVIGATION */}
      <div className="settings-tabs">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>

        <button
          className={activeTab === "appearance" ? "active" : ""}
          onClick={() => setActiveTab("appearance")}
        >
          Appearance
        </button>

        <button
          className={activeTab === "security" ? "active" : ""}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>

        <button
          className={activeTab === "notification" ? "active" : ""}
          onClick={() => setActiveTab("notification")}
        >
          Notifications
        </button>
      </div>


      {/* SETTINGS CONTENT */}
      <div className="settings-card">

        {/* PROFILE SETTINGS */}
        {activeTab === "profile" && (
          <div className="settings-section">
            <h3>Profile Settings</h3>

            <div className="setting-row">
              <label>Name</label>
              <input type="text" placeholder="Admin Name" />
            </div>

            <div className="setting-row">
              <label>Email</label>
              <input type="email" placeholder="admin@email.com" />
            </div>

            <div className="setting-row">
              <label>Phone</label>
              <input type="text" placeholder="+91 XXXXXXXX" />
            </div>

            <button className="btn-save">Save Changes</button>
          </div>
        )}


        {/* APPEARANCE SETTINGS */}
        {activeTab === "appearance" && (
          <div className="settings-section">

            <h3>Appearance</h3>

            <div className="setting-row">
              <label>Theme</label>
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="light">🌞 Light</option>
                <option value="dark">🌙 Dark</option>
              </select>
            </div>

            <div className="setting-row">
              <label>Font Size</label>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
              >
                <option value="small">Small</option>
                <option value="medium">Default</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="setting-row">
              <label>Theme Color</label>
              <input
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
              />
            </div>

          </div>
        )}


        {/* SECURITY */}
        {activeTab === "security" && (
          <div className="settings-section">

            <h3>Security</h3>

            <div className="setting-row">
              <label>Current Password</label>
              <input type="password" />
            </div>

            <div className="setting-row">
              <label>New Password</label>
              <input type="password" />
            </div>

            <div className="setting-row">
              <label>Confirm Password</label>
              <input type="password" />
            </div>

            <button className="btn-save">Update Password</button>

          </div>
        )}


        {/* NOTIFICATION */}
        {activeTab === "notification" && (
          <div className="settings-section">

            <h3>Notification Settings</h3>

            <div className="setting-row toggle">
              <label>Email Notifications</label>
              <input type="checkbox" defaultChecked />
            </div>

            <div className="setting-row toggle">
              <label>System Alerts</label>
              <input type="checkbox" />
            </div>

            <div className="setting-row toggle">
              <label>Order Notifications</label>
              <input type="checkbox" defaultChecked />
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Settings;
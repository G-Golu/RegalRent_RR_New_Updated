import React, { useEffect, useState } from "react";
import "../shopAdminCommon/ShopAdminSetting.css";

const DEFAULT_SETTINGS = {
  theme: "light",
  brightness: 100,
  accent: "#0a58ff",
  sound: true,
  currency: "INR",
  itemsPerPage: 10,
  autoRefresh: true,
};

const ShopAdminSettings = () => {

  /* -------- LOAD SETTINGS SAFELY (NO EFFECT NEEDED) -------- */
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("shop_admin_settings");
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  /* -------- THEME HANDLING -------- */
  const applyTheme = (mode) => {
    if (mode === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute(
        "data-theme",
        systemDark ? "dark" : "light"
      );
    } else {
      document.documentElement.setAttribute("data-theme", mode);
    }
  };

  /* -------- APPLY SETTINGS -------- */
  useEffect(() => {
    localStorage.setItem(
      "shop_admin_settings",
      JSON.stringify(settings)
    );

    applyTheme(settings.theme);

    // brightness
    document.documentElement.style.filter =
      `brightness(${settings.brightness}%)`;

    // accent color
    document.documentElement.style.setProperty(
      "--accent",
      settings.accent
    );
  }, [settings]);

  /* Detect system theme change */
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = () => {
      if (settings.theme === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [settings.theme]);

  /* -------- HANDLERS -------- */
  const update = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <div className="settings-wrapper">
      <h1>⚙ Shop Admin Settings</h1>

      <div className="setting-card">
        <label>Theme Mode</label>
        <select
          value={settings.theme}
          onChange={(e) => update("theme", e.target.value)}
        >
          <option value="light">🌞 Light</option>
          <option value="dark">🌙 Dark</option>
          <option value="system">🖥 System</option>
        </select>
      </div>

      <div className="setting-card">
        <label>Brightness</label>
        <input
          type="range"
          min="70"
          max="120"
          value={settings.brightness}
          onChange={(e) => update("brightness", e.target.value)}
        />
        <span>{settings.brightness}%</span>
      </div>

      <div className="setting-card">
        <label>Accent Color</label>
        <input
          type="color"
          value={settings.accent}
          onChange={(e) => update("accent", e.target.value)}
        />
      </div>

      <div className="setting-card">
        <label>Default Currency</label>
        <select
          value={settings.currency}
          onChange={(e) => update("currency", e.target.value)}
        >
          <option value="INR">₹ INR</option>
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
        </select>
      </div>

      <div className="setting-card">
        <label>Items Per Page</label>
        <select
          value={settings.itemsPerPage}
          onChange={(e) => update("itemsPerPage", Number(e.target.value))}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      <div className="setting-card row">
        <label>Auto Refresh Orders</label>
        <input
          type="checkbox"
          checked={settings.autoRefresh}
          onChange={(e) => update("autoRefresh", e.target.checked)}
        />
      </div>

      <div className="setting-card row">
        <label>System Sounds</label>
        <input
          type="checkbox"
          checked={settings.sound}
          onChange={(e) => update("sound", e.target.checked)}
        />
      </div>

      <div className="setting-actions">
        <button className="reset-btn" onClick={resetSettings}>
          🔄 Reset to Default
        </button>
      </div>
    </div>
  );
};

export default ShopAdminSettings;

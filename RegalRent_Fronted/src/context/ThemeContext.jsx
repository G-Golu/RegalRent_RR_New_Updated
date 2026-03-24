import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const [fontSize, setFontSize] = useState(
    localStorage.getItem("fontSize") || "medium"
  );
  const [accent, setAccent] = useState(
    localStorage.getItem("accent") || "#2563eb"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.setProperty("--accent", accent);
    document.documentElement.style.fontSize =
      fontSize === "small"
        ? "14px"
        : fontSize === "large"
        ? "18px"
        : "16px";

    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("accent", accent);
  }, [theme, fontSize, accent]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, fontSize, setFontSize, accent, setAccent }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

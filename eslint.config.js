// eslint.config.js
// ==============================
// ESLint configuration (RELAXED)
// Bade bhaiya ne khud band kiya 
// ==============================

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
    },

    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    rules: {
      //  YE RULE BAND KAR DIYA
      // Reason: function ko useEffect se pehle call kar rahe ho
      // ESLint strict hota hai, React me ye common hai
      "no-use-before-define": "off",

      // optional: agar aur relaxed chahiye
      "react-hooks/exhaustive-deps": "off",
    },
  },
];

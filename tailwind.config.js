/** @type {import('tailwindcss').Config} */

const themes = require("./theme/themes.cjs");

// console.log({ tailThemes: themes });

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    // themes: ["fantasy", "dracula"],
    themes,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "media",
  },
  // darkMode: "class",
};

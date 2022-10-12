/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#13003f",
        primaryLight: "#b68fcc",
      },
    },
    fontFamily: {
      primary: ["Nunito", "sans-serif"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};

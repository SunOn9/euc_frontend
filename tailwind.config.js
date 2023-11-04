import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      sxs: "0.5rem",
      xs: "0.7rem",
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};

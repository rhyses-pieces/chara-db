import defaultTheme from "tailwindcss/defaultTheme";
import harmonyTheme from "@evilmartians/harmony/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/**/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    colors: harmonyTheme,
    extend: {
      fontFamily: {
        sans: 'atkinson', ...defaultTheme.fontFamily.sans,
      },
      boxShadow: {
        DEFAULT: "4px 4px 0px 0px rgba(0,0,0,1)",
        sm: "2px 2px 0px 0px rgba(0,0,0,1)",
      },
      borderWidth: {
        DEFAULT: "2px",
      },
    },
  },
  daisyui: {
  },
  plugins: [require("@tailwindcss/typography"),require("daisyui")],
}


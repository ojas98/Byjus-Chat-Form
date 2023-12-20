/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      background: "#FFFFFF",
      foreground: "#6A6A86",
      muted: "#9E9E9E",
      brand: { DEFAULT: "#5322FF", foreground: "#FFFFFF" },
      accent: {
        DEFAULT: "#F5F5F5",
        foreground: "#6A6A86",
      },
      extend: {},
    },
  },
  plugins: [],
};

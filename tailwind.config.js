/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2rem',
      },
      screens: {
        xl: '1440px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        primary: "#d26030", // Orange
        background: "#000000", // Black
        surface: "#e4e4e4", // Light Grey
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Oswald", "sans-serif"],
      },
    },
  },
  plugins: [],
};

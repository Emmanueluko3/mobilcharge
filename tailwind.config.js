/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EFF3FF",
          100: "#F4EBFF",
          200: "#E9D7FE",
          300: "#D6BBFB",
          400: "#B692F6",
          500: "#428bca",
          600: "#7F56D9",
          700: "#6941C6",
          800: "#53389E",
          900: "#42307D",
          950: "#2C1C5F",
        },
        grey: {
          50: "#F6F7F9",
          100: "#EBEEF3",
          200: "#D3D9E4",
          300: "#ACB9CD",
          400: "#4F7BFE",
          500: "#5F7698",
          600: "#4B5F7E",
          700: "#3D4C67",
          900: "#30394A",
          950: "#202531",
        },
        customPurple: "#231D4F",
      },
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
      },
    },
  },
  plugins: [],
};

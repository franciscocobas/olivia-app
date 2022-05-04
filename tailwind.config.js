const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter-Regular"],
      bold: ["Inter-Bold"],
      extralight: ["Inter-ExtraLight"],
      semibold: ["Inter-SemiBold"],
    },
    extend: {},
  },
  plugins: [],
};

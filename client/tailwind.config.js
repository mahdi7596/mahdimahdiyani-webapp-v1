const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontWeight: {
      extrablack: "950", // Extra Black (950)
      heavyBlack: "1000", // Ultra Black (1000)
      ...defaultTheme.fontWeight,
    },
    fontFamily: {
      primaryFont: ["primaryFont"],
      headingFont: ["headingFont"],
    },
  },
  plugins: [require("daisyui")],
};

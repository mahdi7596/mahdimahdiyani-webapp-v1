/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontWeight: {
      thin: "100", // Thin (100)
      extralight: "200", // Extra Light (200)
      light: "300", // Light (300)
      normal: "400", // Regular (400)
      medium: "500", // Medium (500)
      semibold: "600", // SemiBold (600)
      bold: "700", // Bold (700)
      extrabold: "800", // ExtraBold (800)
      black: "900", // Black (900)
      extrablack: "950", // Extra Black (950)
      heavyBlack: "1000", // Ultra Black (1000)
    },
    fontFamily: {
      primaryFont: ["primaryFont"],
    },
  },
  plugins: [require("daisyui")],
};

// Replace require with import
import defaultTheme from "tailwindcss/defaultTheme";
import daisyui from "daisyui";
import daisyuiThemes from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primaryFont: ["primaryFont"],
      headingFont: ["headingFont"],
    },
    extend: {
      container: {
        center: true,
        // padding: {
        //   DEFAULT: "20px",
        //   lg: "80px",
        // },
      },
      screens: {
        xxs: "340px",
        xs: "440px",
        xsm: "540px",
        // ...defaultTheme.screens,
      },
      colors: {
        primary: "var(--primary)",
        primary900: "var(--primary-900)",
        primary800: "var(--primary-800)",
        primary700: "var(--primary-700)",
        primary600: "var(--primary-600)",
        primary500: "var(--primary-500)",
        primary400: "var(--primary-400)",
        primary300: "var(--primary-300)",
        primary200: "var(--primary-200)",
        primary100: "var(--primary-100)",
        primary0: "var(--primary-0)",

        neutrals: "var(--neutrals)",
        neutrals600: "var(--neutrals-600)",
        neutrals500: "var(--neutrals-500)",
        neutrals400: "var(--neutrals-400)",
        neutrals300: "var(--neutrals-300)",
        neutrals200: "var(--neutrals-200)",
        neutrals100: "var(--neutrals-100)",

        surfaceBg: "var(--surfaceBg)",
        surfaceBorder: "var(--surfaceBorder)",

        backgroundColor: "var(--backgroundColor)",

        info: "var(--info)",
        success: "var(--success)",
        warn: "var(--warn)",
        danger: "var(--danger)",
        teal: "var(--teal)",
      },
      fontWeight: {
        extrablack: "950", // Extra Black (950)
        heavyBlack: "1000", // Ultra Black (1000)
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyuiThemes["light"],
          primary: "#B9812B",
          "primary-content": "#ffffff",
          neutral: "#111111",
          "neutral-content": "#D7D7D7",
          accent: "#00B8D9",
          "accent-content": "#ffffff",
          error: "#C8372C",
          "error-content": "#ffffff",
        },
      },
    ],
  },
};

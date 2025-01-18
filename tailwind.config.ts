import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: 
      screens: {
        desktop: { min: "1024px" },
        tablet: { min: "744px", max: "1023px" },
        mobile: { min: "344px", max: "743px" },
      },
      colors: {
        black: "var(--color-black)",
        "nomad-black": "var(--color-nomad-black)",
        gray: {
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
          800: "var(--color-gray-800)",
          900: "var(--color-gray-900)",
        },
        green: {
          DEFAULT: "var(--color-green)",
          light: "var(--color-green-light)",
          dark: "var(--color-green-dark)",
        },
        red: {
          DEFAULT: "var(--color-red)",
          light: "var(--color-red-light)",
          dark: "var(--color-red-dark)",
        },
        orange: {
          DEFAULT: "var(--color-orange)",
          light: "var(--color-orange-light)",
        },
        yellow: "var(--color-yellow)",
        blue: {
          DEFAULT: "var(--color-blue)",
          light: "var(--color-blue-light)",
          medium: "var(--color-blue-medium)",
        },
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        "3xl": ["3.2rem", { lineHeight: "4.2rem" }],
        "2xl": ["2.4rem", { lineHeight: "3.2rem" }],
        xl: ["2.0rem", { lineHeight: "3.2rem" }],
        lg: ["1.6rem", { lineHeight: "2.6rem" }],
        "2lg": ["1.8rem", { lineHeight: "2.6rem" }],
        md: ["1.4rem", { lineHeight: "2.4rem" }],
        sm: ["1.3rem", { lineHeight: "2.2rem" }],
        xs: ["1.2rem", { lineHeight: "1.8rem" }],
      },

      fontWeight: {
        regular: "var(--regular)",
        medium: "var(--medium)",
        semiBold: "var(--semi-bold)",
        bold: "var(--bold)",
      },
      screens: {
        sm: "375px",
        md: "744px",
        lg: "1024px",
      },
    },
  },
  plugins: [],
} satisfies Config;

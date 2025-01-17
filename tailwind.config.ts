import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        "3xl": ["32px", "42px"],
        "2xl": ["24px", "32px"],
        xl: ["20px", "32px"],
        lg: ["16px", "26px"],
        md: ["14px", "24px"],
        sm: ["13px", "22px"],
        xs: ["12px", "18px"],
      },
      fontWeight: {
        bold: "700",
        semibold: "600",
        medium: "500",
        regular: "400",
      },
    },
  },
  plugins: [],
} satisfies Config;

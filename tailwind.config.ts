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
        black: "#1B1B1B",
        "nomad-black": "#112211",
        gray: {
          100: "#FAFAFA",
          200: "#EEEEEE",
          300: "#DDDDDD",
          400: "#CBC9CF",
          500: "#ADAEB8",
          600: "#A4A1AA",
          700: "#A1A1A1",
          800: "#79747E",
          900: "#4B4B4B",
        },
        green: {
          DEFAULT: "#00A007",
          light: "#CEDB05",
          dark: "#0B3B2D",
        },
        red: {
          DEFAULT: "#FF472E",
          light: "#FFC2BA",
          dark: "#FFE4E0",
        },
        orange: {
          DEFAULT: "#FF7C1D",
          light: "#FFF4E8",
        },
        yellow: "#FFC23D",
        blue: {
          DEFAULT: "#0085FF",
          light: "#2EB4FF",
          medium: "#E5F3FF",
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

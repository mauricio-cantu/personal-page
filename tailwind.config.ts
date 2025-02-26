import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sign: "var(--font-sign)",
        lato: "var(--font-lato)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#ECEDEE",
            primary: "#7c2d12",
          },
        },
        dark: {
          colors: {
            background: "#11181C",
            primary: "#f97316",
          },
        },
      },
    }),
  ],
};
export default config;

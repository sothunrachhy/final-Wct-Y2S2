import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        admin: {
          bg: "#0f172a",
          card: "#1e293b",
          border: "#334155",
          accent: "#f59e0b", // Warm gold/amber accent suitable for Khmer Cambodian branding
          accentHover: "#d97706",
          sidebar: "#090d16",
        },
      },
    },
  },
  plugins: [],
};
export default config;

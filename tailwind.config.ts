import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        khmer: {
          gold: "#E5A93C",
          amber: "#D97706",
          red: "#C0392B",
          emerald: "#0D9488",
          dark: "#0F172A",
          cardDark: "#1E293B",
          accent: "#F59E0B",
          bgLight: "#F8FAFC",
          cream: "#FFFBEB",
        },
      },
      fontFamily: {
        sans: ["Roboto", "var(--font-roboto)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        khmer: ["var(--font-battambang)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.08)",
        glassDark: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
        glow: "0 0 20px rgba(229, 169, 60, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;

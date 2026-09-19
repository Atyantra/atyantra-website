/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        inkfg: "rgb(var(--ink-fg) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        ground: "#e8edf3",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: "#8b5cf6",
          "purple-light": "#a78bfa",
          "purple-dark": "#6d28d9",
          cyan: "#06b6d4",
          "cyan-light": "#22d3ee",
          "cyan-dark": "#0891b2",
          pink: "#ec4899",
        },
        dark: {
          950: "#0a0a0f",
          900: "#0f0f1a",
          800: "#1a1a2e",
          700: "#16213e",
          600: "#1e1e3f",
        },
        glass: {
          white: "rgba(255,255,255,0.05)",
          border: "rgba(255,255,255,0.08)",
          hover: "rgba(255,255,255,0.10)",
        },
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        show: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "glow-pulse": {
          "0%, 100%": { "box-shadow": "0 0 20px rgba(139,92,246,0.3)" },
          "50%": { "box-shadow": "0 0 40px rgba(139,92,246,0.6), 0 0 80px rgba(6,182,212,0.2)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "border-glow": {
          "0%, 100%": { "border-color": "rgba(139,92,246,0.4)" },
          "50%": { "border-color": "rgba(6,182,212,0.8)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        show: "show 300ms ease-out",
        "gradient-x": "gradient-x 4s ease infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "slide-up": "slide-up 500ms ease-out",
        "fade-in": "fade-in 400ms ease-out",
        "border-glow": "border-glow 3s ease-in-out infinite",
        shimmer: "shimmer 1.5s infinite",
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
      boxShadow: {
        neon: "0 0 20px rgba(139,92,246,0.4), 0 0 60px rgba(139,92,246,0.15)",
        "neon-cyan": "0 0 20px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.15)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(139,92,246,0.2)",
        glass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

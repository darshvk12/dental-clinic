import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dental: {
          navy:    { DEFAULT: "#0F2D5E", 50: "#EEF3FB", 100: "#C9D8F0", 200: "#95B2E2", 300: "#5A88D1", 400: "#2E64C0", 500: "#1A4FA8", 600: "#153F87", 700: "#0F2D5E", 800: "#0A1F42", 900: "#050F21" },
          mint:    { DEFAULT: "#2BC5A0", 50: "#E8FBF6", 100: "#B8F0E2", 200: "#7DE2C8", 300: "#4DD4AF", 400: "#2BC5A0", 500: "#1EA880", 600: "#167A5C", 700: "#0D4D39", 800: "#072A20", 900: "#031409" },
          gold:    { DEFAULT: "#C9913A", 50: "#FBF3E8", 100: "#F0DAB8", 200: "#E4BE84", 300: "#D8A050", 400: "#C9913A", 500: "#A87528", 600: "#7D571E", 700: "#533A14", 800: "#2A1D0A", 900: "#150E05" },
          slate:   { 50: "#F8FAFC", 100: "#F1F5F9", 200: "#E2E8F0", 300: "#CBD5E1", 400: "#94A3B8", 500: "#64748B", 600: "#475569", 700: "#334155", 800: "#1E293B", 900: "#0F172A" },
          cream:   "#FAFAF7",
          white:   "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
        "display-xs":  ["1.5rem",  { lineHeight: "2rem",   letterSpacing: "-0.02em" }],
        "display-sm":  ["1.875rem",{ lineHeight: "2.375rem",letterSpacing: "-0.02em" }],
        "display-md":  ["2.25rem", { lineHeight: "2.75rem",letterSpacing: "-0.025em" }],
        "display-lg":  ["3rem",    { lineHeight: "3.5rem", letterSpacing: "-0.03em" }],
        "display-xl":  ["3.75rem", { lineHeight: "4.25rem",letterSpacing: "-0.03em" }],
        "display-2xl": ["4.5rem",  { lineHeight: "5rem",  letterSpacing: "-0.035em" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "card":      "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover":"0 4px 12px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.10)",
        "dental":    "0 8px 40px rgba(15,45,94,0.15)",
        "dental-lg": "0 16px 64px rgba(15,45,94,0.20)",
        "mint":      "0 8px 32px rgba(43,197,160,0.25)",
        "glow":      "0 0 0 4px rgba(43,197,160,0.25)",
      },
      animation: {
        "float":      "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-dot":  "pulseDot 2s ease-in-out infinite",
        "slide-up":   "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in":    "fadeIn 0.5s ease-out forwards",
        "count-up":   "countUp 2s ease-out forwards",
      },
      keyframes: {
        float:    { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-12px)" } },
        pulseDot: { "0%,100%": { opacity: "1", transform: "scale(1)" }, "50%": { opacity: "0.5", transform: "scale(1.4)" } },
        slideUp:  { from: { opacity: "0", transform: "translateY(30px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn:   { from: { opacity: "0" }, to: { opacity: "1" } },
        countUp:  { from: { opacity: "0" }, to: { opacity: "1" } },
      },
      backgroundImage: {
        "gradient-radial":      "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":        "linear-gradient(135deg, #0F2D5E 0%, #1A4FA8 50%, #153F87 100%)",
        "card-gradient":        "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.95) 100%)",
        "mint-gradient":        "linear-gradient(135deg, #2BC5A0 0%, #1EA880 100%)",
        "navy-gradient":        "linear-gradient(135deg, #0F2D5E 0%, #153F87 100%)",
        "section-gradient":     "linear-gradient(180deg, #FAFAF7 0%, #F1F5F9 100%)",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#242A45",
        haze: "#969696",
        hairline: "#E4E4EA",
        signal: {
          deep: "#161A45",
          mid: "#3B4BC9",
          bright: "#7C8CF8",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Rubik'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "signal-gradient":
          "linear-gradient(135deg, #161A45 0%, #2B34A8 48%, #5D6CF0 100%)",
      },
      keyframes: {
        "ping-soft": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "80%, 100%": { transform: "scale(2.4)", opacity: "0" },
        },
        shake: {
          "10%, 90%": { transform: "translateX(-1px)" },
          "20%, 80%": { transform: "translateX(2px)" },
          "30%, 50%, 70%": { transform: "translateX(-4px)" },
          "40%, 60%": { transform: "translateX(4px)" },
        },
        "rise-in": {
          "0%": { transform: "translateY(14px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        "ping-soft": "ping-soft 1.8s cubic-bezier(0,0,0.2,1) infinite",
        shake: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",
        "rise-in": "rise-in 0.5s ease-out both",
        shimmer: "shimmer 1.6s infinite linear",
      },
    },
  },
  plugins: [],
} satisfies Config;

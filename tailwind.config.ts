import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // DigAI brand palette
        digai: {
          950: "#081b49", // darkest navy — sidebar bg
          900: "#001c5d", // dark navy
          800: "#0034ab", // primary brand blue
          700: "#1B3A6B",
          600: "#1e3a5f",
          cyan: "#00caf3", // accent cyan
          teal: "#00e6b8",
        },
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Switzer", "Manrope", "ui-sans-serif", "sans-serif"],
      },
      backgroundImage: {
        "digai-gradient":
          "linear-gradient(90deg, #081b49, #0034ab 35%, #00caf3 50%, #001c5d 65% 100%)",
        "digai-gradient-v":
          "linear-gradient(180deg, #081b49, #0034ab 60%, #00caf3 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.25s ease-in-out",
        "slide-in": "slideIn 0.25s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-6px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

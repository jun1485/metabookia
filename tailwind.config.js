/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f2e5ff",
          100: "#e4ccff",
          200: "#d0a9ff",
          300: "#b880ff",
          400: "#a155fd",
          500: "#8833fb",
          600: "#7722e6",
          700: "#671bcd",
          800: "#5717a8",
          900: "#45137f",
          950: "#2a0c4e",
        },
        secondary: {
          50: "#e6f1ff",
          100: "#cce3ff",
          200: "#99c8ff",
          300: "#66a9ff",
          400: "#3385ff",
          500: "#0066ff",
          600: "#0055d9",
          700: "#0044b3",
          800: "#002e7a",
          900: "#001c47",
          950: "#00102b",
        },
        accent: {
          50: "#fff7e6",
          100: "#ffecc6",
          200: "#ffd97f",
          300: "#ffc333",
          400: "#ffb000",
          500: "#ff9800",
          600: "#e67a00",
          700: "#cc6600",
          800: "#a35200",
          900: "#663300",
          950: "#331a00",
        },
        dark: {
          100: "#2d2d3a",
          200: "#252532",
          300: "#1e1e28",
          400: "#16161e",
          500: "#0d0d14",
        },
        light: {
          100: "#ffffff",
          200: "#f8f9fc",
          300: "#f1f4f9",
          400: "#e9edf5",
          500: "#d8e0ed",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        shimmer:
          "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0.1) 60%, transparent 100%)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        glow: "0 0 15px 2px rgba(136, 51, 251, 0.3)",
        "inner-glow": "inset 0 0 10px 0 rgba(136, 51, 251, 0.15)",
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
        float: "float 4s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "metaverse-particle": "metaverse-particle 10s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "metaverse-particle": {
          "0%": {
            transform: "translateZ(0) translateX(0) translateY(0)",
            opacity: 0,
          },
          "20%": { opacity: 0.8 },
          "100%": {
            transform: "translateZ(100px) translateX(50px) translateY(-30px)",
            opacity: 0,
          },
        },
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      perspective: {
        1000: "1000px",
      },
      transformStyle: {
        "3d": "preserve-3d",
      },
      backfaceVisibility: {
        hidden: "hidden",
      },
    },
  },
  plugins: [],
};

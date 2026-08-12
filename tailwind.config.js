/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{jsx,tsx,js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00966b",
          dark: "#007a56",
        },
        secondary: "#e6f5f0",
        "text-dark": "#333333",
        "text-gray": "#666666",
        "text-light": "#999999",
        "bg-color": "#f5f5f5",
        "border-color": "#e0e0e0",
        "seat-women": "#ff9800",
        error: "#ff4d4f",
      },
      fontFamily: {
        prompt: ["Prompt", "sans-serif"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          light: "#F4E9D8",
          mid: "#E8DCC7",
          dark: "#D7C6AA",
        },
        ink: {
          DEFAULT: "#1E1A17",
          soft: "#2B2520",
        },
        rust: {
          DEFAULT: "#9E3B2E",
          light: "#B45C3D",
        },
        umber: "#5A3B2E",
        text: {
          DEFAULT: "#1B1B1B",
          soft: "#2D2D2D",
          muted: "#857768",
        },
      },
      fontFamily: {
        type: ["'Special Elite'", "'Courier Prime'", "monospace"],
        mono: ["'Courier Prime'", "'IBM Plex Mono'", "monospace"],
        serif: ["'Cormorant Garamond'", "'EB Garamond'", "'Libre Baskerville'", "serif"],
        hand: ["'Caveat'", "cursive"],
      },
      boxShadow: {
        paper: "0 2px 6px rgba(30, 26, 23, 0.15), 0 8px 18px rgba(30, 26, 23, 0.12)",
        paperLg: "0 10px 30px rgba(30, 26, 23, 0.22), 0 2px 8px rgba(30, 26, 23, 0.15)",
        stamp: "inset 0 0 0 2px rgba(158, 59, 46, 0.5)",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        electric: "#3b82f6",
        neonPurple: "#8b5cf6",
        magenta: "#ec4899",
        deepViolet: "#1e1b4b",
        darkNavy: "#0f172a",
        aquaGlow: "#22d3ee",
      },
      backgroundImage: {
        'study-gradient': "linear-gradient(to bottom right, #0f172a, #1e1b4b, #312e81)",
        'glow-card': "linear-gradient(to bottom right, rgba(59,130,246,0.2), rgba(236,72,153,0.2))",
      },
      boxShadow: {
        glow: "0 0 20px rgba(59,130,246,0.5), 0 0 40px rgba(236,72,153,0.3)",
        soft: "0 4px 30px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

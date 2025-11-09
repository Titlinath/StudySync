/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sky-teal': '#8AC6D1',
        'lavender-blue': '#A3BFFA',
        'soft-coral': '#FF9A8B',
        'peach': '#FFD6A5',
        'misty-blue': '#E9F0FF',
        'pastel-mint': '#DFF6F0',
        'white-smoke': '#F7F9FC',
        'lilac-mist': '#E8DFF5',
        'charcoal': '#2F2F2F',
        'cool-gray': '#6C757D',
      },
      backgroundImage: {
        'study-gradient': 'linear-gradient(to bottom right, #E9F0FF, #DFF6F0, #F7F9FC)',
        'calm-gradient': 'linear-gradient(135deg, #A3BFFA, #8AC6D1)',
        'coral-gradient': 'linear-gradient(135deg, #FF9A8B, #FFD6A5)',
        'mint-gradient': 'linear-gradient(135deg, #DFF6F0, #8AC6D1)',
        'lavender-gradient': 'linear-gradient(135deg, #E8DFF5, #A3BFFA)',
      },
      boxShadow: {
        'soft': '0 8px 20px rgba(0, 0, 0, 0.05)',
        'glow': '0 8px 30px rgba(138, 198, 209, 0.3)',
      },
    },
  },
  plugins: [],
}
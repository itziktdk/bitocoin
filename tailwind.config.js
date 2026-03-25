/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0B0E11',
          card: '#1E2329',
          'card-hover': '#2B3139',
          gold: '#F7931A',
          blue: '#3B82F6',
          green: '#22C55E',
          red: '#EF4444',
        },
      },
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

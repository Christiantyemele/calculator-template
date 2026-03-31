/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0f172a',
        teal: '#14b8a6',
      },
      backdropBlur: {
        glass: '10px',
      },
    },
  },
  plugins: [],
}

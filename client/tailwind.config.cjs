/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1A090D',
        light: '#EAF0CE',
        ascent: '#00A884',
        ascentt: '#7A8450',
        smoke: '#f5f5f5',
        char: '#121820',
        lg: '#d3d3d3',
      },
      fontFamily: {
        cursive: 'Edu NSW ACT Foundation',
      }
    },
  },
  plugins: [],
}

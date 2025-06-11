/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-teal': '#008080',
        'custom-gray': '#333333',
      }
    },
  },
  plugins: [],
}

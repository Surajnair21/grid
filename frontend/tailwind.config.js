/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'custom-blue-dark': '#2E3A8F',
        'custom-blue-light': '#E8F0FE',
        'custom-orange': '#FF7F50',
        'custom-red-text': '#E53E3E',
        'custom-gray-text': '#4A5568',
        'custom-gray-light': '#F7FAFC',
      }
    },
  },
  plugins: [],
}

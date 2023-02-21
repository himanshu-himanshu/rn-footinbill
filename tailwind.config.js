/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/screens/profile/**/*.{js,jsx,ts,tsx}',
    './app/screens/**/*.{js,jsx,ts,tsx}',
    './app/screens/auth/**/*.{js,jsx,ts,tsx}',
    './app/screens/password/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

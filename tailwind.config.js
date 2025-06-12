/** @type {import('tailwindcss').Config} */
@tailwind base;
@tailwind components;
@tailwind utilities;
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
/* Custom global style */
body {
  font-family: 'Inter', Arial, sans-serif;
}
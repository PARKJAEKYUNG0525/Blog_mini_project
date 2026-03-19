/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    'react-calendar',
    'react-calendar__navigation',
    'react-calendar__tile',
    'react-calendar__tile--active',
    'react-calendar__month-view__days__day',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#2d3748',
          darker: '#222732',
          DEFAULT: '#2d3748',
        },
        secondary: {
          DEFAULT: '#9ca0a6',
        },
        accent: {
          DEFAULT: '#fc8181',
          light: '#f2acac',
          lighter: '#f2d8d8',
        },
      },
    },
  },
  plugins: [],
};

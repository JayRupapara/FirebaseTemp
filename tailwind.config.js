/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Poppins', 'sans-serif'], // Add Poppins as the default sans font
        },
      },
    },
    plugins: [],
  }
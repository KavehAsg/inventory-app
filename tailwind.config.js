/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html"],
  theme: {
    extend: {
      colors:{
        "light" : "#d8dbe0" ,
        "dark" : "#28292c"
      }
    },
  },
  plugins: [require('@tailwindcss/forms'),],
  darkMode: 'class'
}

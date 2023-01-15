/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html"],
  theme: {
    extend: {
      colors:{
        "light" : "#d8dbe0" ,
        "dark" : "#28292c"
      } ,
      boxShadow: {
        'autoComplete': '0 0 0px 1000px inset',
      }
    },
  },
  plugins: [require('@tailwindcss/forms'),],
  darkMode: 'class'
}

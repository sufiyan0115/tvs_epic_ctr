/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,js,tsx,jsx}"],
  theme: {
    extend: {
      colors:{
        primary: '#0c4a85'
      }
    },
    fontFamily:{
      'poppins' : ['Poppins', 'sans-serif']
    }
  },
  plugins: [],
}

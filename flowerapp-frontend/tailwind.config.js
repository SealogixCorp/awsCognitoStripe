module.exports = {
  purge: [
    "./src/**/*.js",
     "./src/**/*.jsx"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
   extend: {
      backgroundColor: ['odd'],
    }
  },
  plugins: [],
}

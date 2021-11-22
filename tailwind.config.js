const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.jsx', './src/**/*.js'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
      minWidth: {
        '300': '300px',
      }
    },
  },
  variants: {
    extend: {
      translate: ['group-hover'],
    }
  },
  plugins: [],
}
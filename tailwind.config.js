/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['node_modules/preline/dist/preline.js'],
  theme: {
    extend: {},
  },
  plugins: ['preline/plugin'],
}


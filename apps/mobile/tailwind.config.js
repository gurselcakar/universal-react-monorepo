/** @type {import('tailwindcss').Config} */
const { tailwindPreset } = require('@packages/theme')

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./src/**/*.{js,jsx,ts,tsx}', '../../packages/ui/src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset'), tailwindPreset],
  theme: {
    extend: {},
  },
  plugins: [],
}

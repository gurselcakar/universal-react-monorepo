/** @type {import('tailwindcss').Config} */
const { tailwindPreset } = require('@packages/theme')

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset'), tailwindPreset],
    theme: {
        extend: {},
    },
    plugins: [],
}

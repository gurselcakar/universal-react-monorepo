/** @type {import('tailwindcss').Config} */
import nativewindPreset from 'nativewind/preset';

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,jsx,ts,tsx}'
  ],
  presets: [nativewindPreset],
  theme: {
    extend: {},
  },
  plugins: [],
}

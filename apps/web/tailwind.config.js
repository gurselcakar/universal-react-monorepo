/** @type {import('tailwindcss').Config} */
import { tailwindPreset } from '@packages/theme'
import nativewindPreset from 'nativewind/preset'

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/shared-frontend/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [nativewindPreset, tailwindPreset],
  theme: {
    extend: {},
  },
  plugins: [],
}

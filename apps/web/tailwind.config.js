/** @type {import('tailwindcss').Config} */
import nativewindPreset from 'nativewind/preset'
import { tailwindPreset } from '@packages/theme'

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', '../../packages/ui/src/**/*.{js,jsx,ts,tsx}'],
  presets: [nativewindPreset, tailwindPreset],
  theme: {
    extend: {},
  },
  plugins: [],
}

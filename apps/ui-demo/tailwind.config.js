/** @type {import('tailwindcss').Config} */
import nativewindPreset from 'nativewind/preset'
import { tailwindPreset } from '@packages/theme'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [nativewindPreset, tailwindPreset],
  theme: {
    extend: {},
  },
  plugins: [],
}

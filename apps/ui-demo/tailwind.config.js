/** @type {import('tailwindcss').Config} */
import { tailwindPreset } from '@packages/theme'
import nativewindPreset from 'nativewind/preset'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/shared-frontend/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [nativewindPreset, tailwindPreset],
  theme: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
import nativewindPreset from 'nativewind/preset';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [nativewindPreset],
  theme: {
    extend: {},
  },
  plugins: [],
}

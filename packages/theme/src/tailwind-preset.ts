import type { Config } from 'tailwindcss'

import { darkColors, lightColors } from './theme'

const tailwindPreset: Config = {
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      colors: {
        ...lightColors,
        dark: darkColors,
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 3px hsl(26 9% 15% / 0.06)',
        md: '0 4px 12px hsl(26 9% 15% / 0.08)',
        lg: '0 8px 30px hsl(26 9% 15% / 0.12)',
      },
    },
  },
}

export default tailwindPreset

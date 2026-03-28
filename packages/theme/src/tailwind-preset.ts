import type { Config } from 'tailwindcss'

import { lightColors } from './theme'

const tailwindPreset: Config = {
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      colors: lightColors,
    },
  },
}

export default tailwindPreset

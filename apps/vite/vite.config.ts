import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactNativeWeb from "vite-plugin-react-native-web";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'nativewind',
      jsxRuntime: 'automatic'
    }),
    reactNativeWeb(),
  ],
})

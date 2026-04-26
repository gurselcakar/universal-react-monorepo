import path from 'path'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import reactNativeWeb from 'vite-plugin-react-native-web'

/**
 * Transforms require('./foo.png') → new URL('./foo.png', import.meta.url).href
 * so Vite's asset pipeline handles images correctly at serve/build time.
 */
function requireImageTransform(): Plugin {
  const imageRe = /\brequire\(\s*(['"])((?:[^'"]*?)\.(?:png|jpe?g|gif|webp|svg))\1\s*\)/g
  return {
    name: 'require-image-transform',
    transform(code, id) {
      if (!/\.[jt]sx?$/.test(id) || !code.includes('require(')) return null
      const result = code.replace(
        imageRe,
        (_, _q, p) => `new URL(${JSON.stringify(p)}, import.meta.url).href`,
      )
      return result !== code ? { code: result, map: null } : null
    },
  }
}

export default defineConfig({
  plugins: [
    requireImageTransform(),
    tanstackRouter({ routesDirectory: './src/routes' }),
    react({
      jsxImportSource: 'nativewind',
      jsxRuntime: 'automatic',
    }),
    reactNativeWeb(),
  ],
  resolve: {
    alias: {
      '@chalkboard/ui-demo': path.resolve(__dirname, './src'),
      'lucide-react-native': path.resolve(__dirname, 'node_modules/lucide-react'),
    },
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp'],
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    'process.env.EXPO_OS': JSON.stringify('web'),
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.mjs': 'jsx',
      },
      plugins: [
        {
          // During dep-scanning esbuild has no output path, so we can't use
          // the "file" loader. Stub image requires as empty JS so scanning
          // doesn't crash — the real transform plugin handles them at serve time.
          name: 'image-stub-for-dep-scan',
          setup(build) {
            build.onLoad({ filter: /\.(png|jpe?g|gif|webp|svg)$/ }, () => ({
              contents: 'module.exports = ""',
              loader: 'js',
            }))
          },
        },
      ],
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
  },
})

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { indexImages } from '@chalkboard/image-indexer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const packageRoot = path.resolve(__dirname, '..')

/**
 * mobile app image indexer
 *
 * - SVG source:    assets/svg/          (converted to WebP → assets/images/converted-svg/)
 * - Image source:  assets/images/       (existing raster images indexed, excluding SVGs)
 * - Output format: require
 *     → src/lib/image-sources.ts        (require() map for Metro / expo-image)
 *
 * Note: shared images (turborepo-dark, next, expo-wordmark, nativewind-logo) are
 * consumed from @chalkboard/shared-frontend instead.
 */
const main = async () => {
  await indexImages({
  cwd: packageRoot,
  svgDir: 'assets/svg',
  imagesDir: 'assets/images',
  outputFile: 'src/lib/image-sources',
  outputFormat: 'require',
  requirePrefix: '@chalkboard/mobile/assets/images',
  imageSourceType: "import type { ImageSource } from 'expo-image'",
  prettier: true,
  })
}

main().catch((error: unknown) => {
  console.error('Image indexing failed:', error)
  process.exit(1)
})

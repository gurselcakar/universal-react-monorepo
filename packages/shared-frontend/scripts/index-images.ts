import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { indexImages } from '@chalkboard/image-indexer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const packageRoot = path.resolve(__dirname, '..')

/**
 * shared-frontend image indexer
 *
 * - SVG source:    assets/svg/          (converted to WebP)
 * - Image source:  assets/images/       (existing raster images indexed)
 * - Output format: require
 *     → src/lib/image-sources.ts        (shared types + dimensions)
 *     → src/lib/image-sources.native.ts (require() map for Metro)
 *     → src/lib/image-sources.web.ts    (URL string map for Next.js / Vite)
 */
const main = async () => {
  await indexImages({
    cwd: packageRoot,
    svgDir: 'assets/svg',
    imagesDir: 'assets/images',
    outputFile: 'src/lib/image-sources',
    outputFormat: 'require',
    requirePrefix: '@chalkboard/shared-frontend/assets/images',
    imageSourceType: "import type { ImageSource } from 'expo-image'",
    prettier: true,
  })
}

main().catch((error: unknown) => {
  console.error('Image indexing failed:', error)
  process.exit(1)
})

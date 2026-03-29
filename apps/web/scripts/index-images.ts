import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { indexImages } from '@chalkboard/image-indexer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const packageRoot = path.resolve(__dirname, '..')

/**
 * web app image indexer
 *
 * - SVG source:    assets/svg/          (converted to WebP → public/images/converted-svg/)
 * - Image source:  public/images/       (existing raster images indexed)
 * - Output format: url
 *     → src/lib/image-sources.ts        (URL string map for Next.js)
 *
 * Note: shared images are served from /shared/ (copied by shared-frontend indexer).
 */
const main = async () => {
  await indexImages({
  cwd: packageRoot,
  svgDir: 'assets/svg',
  imagesDir: 'public/images',
  convertedSvgDir: 'public/images/converted-svg',
  outputFile: 'src/lib/image-sources',
  outputFormat: 'url',
  urlPrefix: '/images',
  prettier: true,
  })
}

main().catch((error: unknown) => {
  console.error('Image indexing failed:', error)
  process.exit(1)
})

import path from 'node:path'

import { convertSvgs } from './convert-svg'
import { generateOutput } from './generate-output'
import { checkDuplicates, scanImages } from './scan-images'
import type { IndexerConfig } from './types'

export type { IndexerConfig, OutputFormat, ConversionMapping, ImageEntry, ImageDimension } from './types'

/**
 * Run the full image indexing pipeline:
 * 1. Convert SVGs to WebP (if `svgDir` provided)
 * 2. Scan existing raster images
 * 3. Merge entries, check duplicates
 * 4. Generate typed TypeScript output file(s)
 */
export const indexImages = async (config: IndexerConfig): Promise<void> => {
  const {
    cwd,
    svgDir,
    imagesDir,
    convertedSvgDir,
    outputFile,
    outputFormat,
    requirePrefix,
    urlPrefix,
    imageSourceType,
    conversionMapping = [],
    defaultConversionWidth = 512,
    prettier = true,
  } = config

  const resolvedImagesDir = path.resolve(cwd, imagesDir)
  const resolvedOutputFile = path.resolve(cwd, outputFile)
  const resolvedConvertedSvgDir = convertedSvgDir
    ? path.resolve(cwd, convertedSvgDir)
    : path.join(resolvedImagesDir, 'converted-svg')

  console.log(`\n--- Image Indexer ---`)
  console.log(`  cwd:          ${cwd}`)
  console.log(`  imagesDir:    ${resolvedImagesDir}`)
  console.log(`  outputFile:   ${resolvedOutputFile}`)
  console.log(`  outputFormat: ${outputFormat}`)
  if (svgDir) console.log(`  svgDir:       ${path.resolve(cwd, svgDir)}`)

  // Step 1: Convert SVGs (optional)
  let svgEntries: { name: string; relativePath: string; absolutePath: string; width: number; height: number }[] = []
  if (svgDir) {
    const resolvedSvgDir = path.resolve(cwd, svgDir)
    svgEntries = await convertSvgs({
      svgDir: resolvedSvgDir,
      outputDir: resolvedConvertedSvgDir,
      conversionMapping,
      defaultWidth: defaultConversionWidth,
    })
  }

  // Step 2: Scan existing raster images (exclude converted-svg dir)
  const { entries: imageEntries, dimensions: imageDimensions } = await scanImages(
    resolvedImagesDir,
    [resolvedConvertedSvgDir],
  )

  // Step 3: Merge SVG + image entries
  const svgImageEntries = svgEntries.map((s) => ({
    name: s.name,
    type: 'svg' as const,
    relativePath: s.relativePath,
    absolutePath: s.absolutePath,
  }))

  const allEntries = checkDuplicates([...svgImageEntries, ...imageEntries])

  // Build combined dimensions map
  const allDimensions = new Map(imageDimensions)
  for (const svg of svgEntries) {
    allDimensions.set(svg.name, { width: svg.width, height: svg.height })
  }

  if (allEntries.length === 0) {
    console.log('No images found — skipping output generation')
    return
  }

  // Step 4: Generate output
  generateOutput({
    entries: allEntries,
    dimensions: allDimensions,
    outputFile: resolvedOutputFile,
    outputFormat,
    requirePrefix,
    urlPrefix,
    imageSourceType,
    prettier,
  })

  console.log(`\nDone! Indexed ${allEntries.length} images (${svgEntries.length} from SVG, ${imageEntries.length} raster)`)
}

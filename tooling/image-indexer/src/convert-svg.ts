import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

import { glob } from 'glob'

import { getImageDimensions } from './dimensions'
import type { ConversionMapping } from './types'

interface ConvertSvgsOptions {
  svgDir: string
  outputDir: string
  conversionMapping: ConversionMapping[]
  defaultWidth: number
}

interface ConvertedSvg {
  /** Kebab-cased name (e.g. `flags-gb`) */
  name: string
  /** Relative path from outputDir (e.g. `flags/gb.webp`) */
  relativePath: string
  /** Absolute path on disk */
  absolutePath: string
  width: number
  height: number
}

/**
 * Convert all SVGs in `svgDir` to lossless WebP in `outputDir`.
 * Returns metadata for each converted file.
 */
export const convertSvgs = async (options: ConvertSvgsOptions): Promise<ConvertedSvg[]> => {
  const { svgDir, outputDir, conversionMapping, defaultWidth } = options

  if (!fs.existsSync(svgDir)) {
    console.log(`SVG directory not found: ${svgDir} — skipping conversion`)
    return []
  }

  // Clean and recreate output directory
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true })
    console.log('Deleted existing converted SVG directory')
  }
  fs.mkdirSync(outputDir, { recursive: true })

  const svgPattern = path.join(svgDir, '**', '*.svg')
  const svgFiles = glob.sync(svgPattern)
  const relativePaths = svgFiles.map((file) => path.relative(svgDir, file))

  console.log(`Found ${relativePaths.length} SVG files to convert`)

  const results: ConvertedSvg[] = []
  let converted = 0

  for (const relativePath of relativePaths) {
    const svgPath = path.join(svgDir, relativePath)
    const webpRelativePath = relativePath.replace('.svg', '.webp')
    const webpPath = path.join(outputDir, webpRelativePath)

    // Ensure subdirectory exists
    const webpDir = path.dirname(webpPath)
    if (!fs.existsSync(webpDir)) {
      fs.mkdirSync(webpDir, { recursive: true })
    }

    // Determine target width from mapping
    const targetWidth = getConversionWidth(relativePath, conversionMapping, defaultWidth)

    try {
      convertSingleSvg(svgPath, webpPath, targetWidth)
      const dims = await getImageDimensions(webpPath)
      const name = relativePath.replace('.svg', '').replaceAll(path.sep, '-').replaceAll('/', '-')

      results.push({
        name,
        relativePath: webpRelativePath.replaceAll(path.sep, '/'),
        absolutePath: webpPath,
        ...dims,
      })

      converted++
      if (converted % 50 === 0) {
        console.log(`  Converted ${converted}/${relativePaths.length} files...`)
      }
    } catch (error) {
      console.error(`Failed to convert ${relativePath}:`, error)
    }
  }

  console.log(`Converted ${converted} SVG files to WebP`)
  return results
}

const getConversionWidth = (
  relativePath: string,
  mappings: ConversionMapping[],
  defaultWidth: number,
): number => {
  for (const { pattern, width } of mappings) {
    if (new RegExp(pattern).test(relativePath)) {
      return width
    }
  }
  return defaultWidth
}

const convertSingleSvg = (svgPath: string, webpPath: string, width: number): void => {
  try {
    // Primary: rsvg-convert → temp PNG → cwebp → WebP
    const tempPngPath = webpPath.replace('.webp', '.temp.png')
    execSync(`rsvg-convert -w ${width} "${svgPath}" -o "${tempPngPath}"`, { stdio: 'pipe' })
    execSync(`cwebp -q 100 -lossless "${tempPngPath}" -o "${webpPath}"`, { stdio: 'pipe' })
    if (fs.existsSync(tempPngPath)) {
      fs.unlinkSync(tempPngPath)
    }
  } catch {
    // Fallback: ImageMagick direct WebP conversion
    execSync(
      `convert -background none -resize ${width}x "${svgPath}" -define webp:lossless=true -quality 100 "${webpPath}"`,
      { stdio: 'pipe' },
    )
  }
}

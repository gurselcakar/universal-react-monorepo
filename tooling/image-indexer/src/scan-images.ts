import fs from 'node:fs'
import path from 'node:path'

import { glob } from 'glob'

import { getImageDimensions } from './dimensions'
import type { ImageDimension, ImageEntry } from './types'

interface ScanResult {
  entries: ImageEntry[]
  dimensions: Map<string, ImageDimension>
}

/**
 * Scan a directory for raster images (png, jpg, jpeg, webp).
 * Converts nested paths to kebab-cased names: `folder/file.png` → `folder-file`.
 */
export const scanImages = async (
  imagesDir: string,
  excludeDirs: string[] = [],
): Promise<ScanResult> => {
  if (!fs.existsSync(imagesDir)) {
    console.log(`Images directory not found: ${imagesDir} — skipping scan`)
    return { entries: [], dimensions: new Map() }
  }

  const imagePattern = path.join(imagesDir, '**', '*.{png,jpg,jpeg,webp}')
  const ignorePatterns = excludeDirs.map((dir) => path.join(dir, '**'))

  const imageFiles = glob.sync(imagePattern, { ignore: ignorePatterns })
  const entries: ImageEntry[] = []
  const dimensions = new Map<string, ImageDimension>()

  for (const filePath of imageFiles) {
    const relativePath = path.relative(imagesDir, filePath).replaceAll(path.sep, '/')
    const parsed = path.parse(relativePath)
    const dirParts = parsed.dir ? parsed.dir.split('/') : []
    const name = [...dirParts, parsed.name].join('-')

    entries.push({
      name,
      type: 'image',
      relativePath,
      absolutePath: filePath,
    })

    const dims = await getImageDimensions(filePath)
    dimensions.set(name, dims)
  }

  console.log(`Found ${entries.length} raster images in ${imagesDir}`)
  return { entries, dimensions }
}

/** Check for duplicate names and warn. Returns deduplicated list. */
export const checkDuplicates = (entries: ImageEntry[]): ImageEntry[] => {
  const seen = new Map<string, ImageEntry>()
  const duplicates: string[] = []

  for (const entry of entries) {
    if (seen.has(entry.name)) {
      duplicates.push(entry.name)
    } else {
      seen.set(entry.name, entry)
    }
  }

  if (duplicates.length > 0) {
    console.warn('Warning: Found duplicate image names:', duplicates)
  }

  return [...seen.values()]
}

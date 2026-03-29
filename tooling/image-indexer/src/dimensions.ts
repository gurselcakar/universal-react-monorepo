import sharp from 'sharp'

import type { ImageDimension } from './types'

/** Extract width/height from an image file using sharp. */
export const getImageDimensions = async (imagePath: string): Promise<ImageDimension> => {
  try {
    const metadata = await sharp(imagePath).metadata()
    if (!metadata.width || !metadata.height) {
      throw new Error('Invalid dimensions')
    }
    return { width: metadata.width, height: metadata.height }
  } catch {
    console.warn(`Failed to get dimensions for ${imagePath}, using defaults`)
    return { width: 0, height: 0 }
  }
}

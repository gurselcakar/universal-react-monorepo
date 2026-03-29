/**
 * Output format for the generated image sources file.
 *
 * - `'require'` — Single `.ts` file with `require()` calls. For React Native / Metro consumers.
 * - `'url'`     — Single `.ts` file with URL strings. For Next.js / Vite web consumers.1
 */
export type OutputFormat = 'require' | 'url'

export interface ConversionMapping {
  /** Regex pattern matched against the relative SVG path (e.g. `'^flags/(.+)\\.svg$'`). */
  pattern: string
  /** Target width in pixels for the converted image. */
  width: number
}

export interface IndexerConfig {
  /** Absolute path to the project root. Used to resolve relative paths. */
  cwd: string

  /**
   * Directory containing source SVG files to convert to WebP.
   * Relative to `cwd`. If omitted, SVG conversion is skipped.
   */
  svgDir?: string

  /**
   * Directory containing existing raster images (png, jpg, jpeg, webp) to index.
   * Relative to `cwd`.
   */
  imagesDir: string

  /**
   * Directory where converted SVG → WebP files are written.
   * Relative to `cwd`. Defaults to `${imagesDir}/converted-svg`.
   */
  convertedSvgDir?: string

  /**
   * Output file path **without extension**.
   * - Generates `${outputFile}.ts`
   *
   * Relative to `cwd`.
   */
  outputFile: string

  /** Determines the shape of the generated TypeScript file(s). */
  outputFormat: OutputFormat

  /**
   * Path prefix for `require()` statements in native output.
   * e.g. `'@chalkboard/shared-frontend/assets/images'`
   */
  requirePrefix?: string

  /**
   * URL prefix for web output.
   * e.g. `'/shared'`
   */
  urlPrefix?: string

  /**
   * TypeScript import statement for the image source type.
   * Used in `'require'` output.
   * e.g. `"import type { ImageSource } from 'expo-image'"`
   *
   * If omitted, the sources record uses `unknown` as its value type.
   */
  imageSourceType?: string

  /**
   * Custom width mappings for SVG conversion.
   * Each entry maps a regex pattern to a target width.
   */
  conversionMapping?: ConversionMapping[]

  /** Default width for SVG conversion when no mapping matches. Defaults to 512. */
  defaultConversionWidth?: number

  /** Whether to run prettier on the generated output. Defaults to true. */
  prettier?: boolean
}

export interface ImageEntry {
  /** Kebab-cased name: `folder-subfolder-filename` */
  name: string
  /** Source type */
  type: 'svg' | 'image'
  /** Relative path from imagesDir (for images) or convertedSvgDir (for svgs). Always uses `/` separators. */
  relativePath: string
  /** Full absolute path to the file on disk. */
  absolutePath: string
}

export interface ImageDimension {
  width: number
  height: number
}

import { Image as ExpoImage } from 'expo-image'

import { cn } from '../lib/cn'

interface NativeDimensions {
  width: number
  height: number
}

export interface ImageProps extends Omit<React.ComponentProps<typeof ExpoImage>, 'alt'> {
  alt: string
  /**
   * Force the image to maintain a specific aspect ratio by providing either a width or height.
   *
   * Native dimensions are required to calculate the missing dimension based on the provided one.
   */
  forceAspectRatio?:
    | {
        width: number
        nativeDimensions: NativeDimensions
      }
    | {
        height: number
        nativeDimensions: NativeDimensions
      }
}

export const Image = ({
  source,
  alt,
  className,
  forceAspectRatio,
  style,
  ...props
}: ImageProps) => {
  let calculatedStyle = style
  if (forceAspectRatio) {
    const aspectRatio =
      forceAspectRatio.nativeDimensions.width / forceAspectRatio.nativeDimensions.height

    if ('width' in forceAspectRatio) {
      calculatedStyle = [
        style,
        { width: forceAspectRatio.width, height: forceAspectRatio.width / aspectRatio },
      ]
    } else {
      calculatedStyle = [
        style,
        { height: forceAspectRatio.height, width: forceAspectRatio.height * aspectRatio },
      ]
    }
  }

  return (
    <ExpoImage
      source={source}
      accessibilityLabel={alt}
      contentFit="contain"
      className={cn('pointer-events-none select-none', className)}
      style={calculatedStyle}
      {...props}
    />
  )
}

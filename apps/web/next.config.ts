import type { NextConfig } from 'next'
import webpack from 'webpack'

const nextConfig: NextConfig = {
  transpilePackages: [
    'react-native',
    'react-native-web',
    'react-native-css-interop',
    'nativewind',
    'expo-image',
    'expo-modules-core',
    'expo',
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    }
    config.resolve.extensions = ['.web.ts', '.web.tsx', '.web.js', ...config.resolve.extensions]
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
        'process.env.EXPO_OS': JSON.stringify('web'),
      }),
    )
    // Remove any pre-existing rules that match image extensions to avoid
    // conflicts with Next.js defaults, then re-add as asset/resource so that
    // require('./foo.png') returns the hashed URL string (same as Vite build).
    const imageRe = /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i
    config.module.rules = config.module.rules.map((rule: any) => {
      if (rule.test instanceof RegExp && rule.test.source.match(/png|jpe?g|gif|webp|svg/i)) {
        return { ...rule, exclude: imageRe }
      }
      return rule
    })
    config.module.rules.push({
      test: imageRe,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash:8][ext]',
      },
    })
    return config
  },
}

export default nextConfig

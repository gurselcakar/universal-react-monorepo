import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  transpilePackages: [
    'react-native',
    'react-native-web',
    'react-native-css-interop',
    'nativewind',
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    };
    config.resolve.extensions = [
      '.web.ts',
      '.web.tsx',
      '.web.js',
      ...config.resolve.extensions,
    ];
    return config;
  }
}
 
export default nextConfig
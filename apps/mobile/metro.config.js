const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

const workspaceRoot = path.resolve(__dirname, '../..')

const config = getDefaultConfig(__dirname)

// Map workspace package names to their src roots so self-referencing imports
// like `@chalkboard/shared-frontend/lib/trpc` resolve correctly in Metro.
const packageSrcRoots = {
  '@chalkboard/shared-frontend': path.join(workspaceRoot, 'packages/shared-frontend/src'),
}

config.resolver.resolveRequest = (context, moduleName, platform) => {
  for (const [pkgName, srcRoot] of Object.entries(packageSrcRoots)) {
    if (moduleName === pkgName) {
      return context.resolveRequest(context, path.join(srcRoot, 'index.ts'), platform)
    }
    if (moduleName.startsWith(pkgName + '/')) {
      const subPath = moduleName.slice(pkgName.length + 1)
      return context.resolveRequest(context, path.join(srcRoot, subPath), platform)
    }
  }
  return context.resolveRequest(context, moduleName, platform)
}

module.exports = withNativeWind(config, { input: './global.css', inlineRem: 16 })

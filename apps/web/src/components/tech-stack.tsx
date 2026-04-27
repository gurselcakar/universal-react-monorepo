import { imageSources, nativeDimensions, Image } from '@chalkboard/shared-frontend'

const technologies = [
  {
    name: 'Turborepo',
    description: 'High-performance build system with intelligent caching',
    logo: imageSources['turborepo-dark'],
    ...nativeDimensions['turborepo-dark'],
  },
  {
    name: 'Next.js 16',
    description: 'React framework with App Router for the web',
    logo: imageSources.next,
    ...nativeDimensions.next,
  },
  {
    name: 'Expo SDK 54',
    description: 'React Native framework with Expo Router',
    logo: imageSources['expo-wordmark'],
    ...nativeDimensions['expo-wordmark'],
  },
  {
    name: 'NativeWind',
    description: 'Tailwind CSS for React Native',
    logo: imageSources['nativewind-logo'],
    ...nativeDimensions['nativewind-logo'],
  },
]

export const TechStack = () => (
  <section className="border-t border-gray-100 px-6 py-12">
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-10 text-center text-2xl font-semibold text-gray-900">Tech Stack</h2>

      <div className="grid grid-cols-2 gap-8">
        {technologies.map((tech) => (
          <div key={tech.name} className="flex items-center gap-4">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center">
              <Image
                source={tech.logo}
                alt={`${tech.name} logo`}
                className="h-full w-full object-contain"
                forceAspectRatio={{
                  width: 40,
                  nativeDimensions: {
                    width: tech.width,
                    height: tech.height,
                  },
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-gray-900">{tech.name}</h3>
              <p className="text-sm text-gray-500">{tech.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

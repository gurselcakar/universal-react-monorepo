import Image from 'next/image'

const technologies = [
  {
    name: 'Turborepo',
    description: 'High-performance build system with intelligent caching',
    logo: '/turborepo-dark.svg',
  },
  {
    name: 'Next.js 16',
    description: 'React framework with App Router for the web',
    logo: '/next.svg',
  },
  {
    name: 'Expo SDK 54',
    description: 'React Native framework with Expo Router',
    logo: '/expo-wordmark.png',
  },
  {
    name: 'NativeWind',
    description: 'Tailwind CSS for React Native',
    logo: '/nativewind-logo.jpeg',
  },
]

export function TechStack() {
  return (
    <section className="py-12 px-6 border-t border-gray-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">
          Tech Stack
        </h2>

        <div className="grid grid-cols-2 gap-8">
          {technologies.map((tech) => (
            <div key={tech.name} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <Image
                  src={tech.logo}
                  alt={`${tech.name} logo`}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900">
                  {tech.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

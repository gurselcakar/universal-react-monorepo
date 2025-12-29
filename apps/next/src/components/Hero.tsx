import Link from 'next/link'

export function Hero() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
          Build once, run everywhere
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          A production-ready monorepo template for building cross-platform applications
          with shared components between React Native and Next.js.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="https://github.com/gurselcakar/universal-react-monorepo"
            target="_blank"
            rel="noopener"
            className="px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            Star on GitHub
          </Link>
          <Link
            href="https://gurselcakar.com/monorepo"
            target="_blank"
            rel="noopener"
            className="px-6 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            Read the Blog Post
          </Link>
          <Link
            href="/nativewind"
            className="px-6 py-3 text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors"
          >
            View Components
          </Link>
        </div>
      </div>
    </section>
  )
}

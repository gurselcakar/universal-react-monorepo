import { Link } from '@tanstack/react-router'

export const Hero = () => (
  <section className="px-6 py-20">
    <div className="mx-auto max-w-4xl text-center">
      <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Build once, run everywhere
      </h1>

      <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600">
        A production-ready monorepo template for building cross-platform applications with shared
        components between React Native and Vite.
      </p>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="https://github.com/gurselcakar/universal-react-monorepo"
          target="_blank"
          rel="noopener"
          className="rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Star on GitHub
        </a>
        <a
          href="https://gurselcakar.com/monorepo"
          target="_blank"
          rel="noopener"
          className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900"
        >
          Read the Blog Post
        </a>
        <Link
          to="/nativewind"
          className="px-6 py-3 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          View Components
        </Link>
      </div>
    </div>
  </section>
)

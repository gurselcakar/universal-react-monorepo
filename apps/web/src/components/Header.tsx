import Link from 'next/link'

export const Header = () => (
  <header className="border-b border-gray-200 bg-white">
    <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
      <Link
        href="/"
        className="text-lg font-semibold text-gray-900 transition-colors hover:text-gray-700"
      >
        Universal React Monorepo
      </Link>

      <nav className="flex items-center gap-6 text-sm">
        <Link href="/nativewind" className="text-gray-600 transition-colors hover:text-gray-900">
          NativeWind
        </Link>
        <Link
          href="https://gurselcakar.com/monorepo"
          target="_blank"
          rel="noopener"
          className="text-gray-600 transition-colors hover:text-gray-900"
        >
          Blog
        </Link>
        <Link
          href="https://github.com/gurselcakar/universal-react-monorepo"
          target="_blank"
          rel="noopener"
          className="text-gray-600 transition-colors hover:text-gray-900"
        >
          GitHub
        </Link>
      </nav>
    </div>
  </header>
)

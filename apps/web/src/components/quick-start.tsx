export const QuickStart = () => (
  <section className="border-t border-gray-100 px-6 py-16">
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-8 text-center text-2xl font-semibold text-gray-900">Quick Start</h2>

      <div className="mx-auto max-w-lg">
        <div className="rounded-lg bg-gray-900 p-5 font-mono text-sm">
          <div className="mb-2 text-gray-400"># Clone and install</div>
          <div className="mb-3 text-gray-100">
            <span className="text-gray-500">$</span> git clone
            https://github.com/gurselcakar/universal-react-monorepo.git
          </div>
          <div className="mb-3 text-gray-100">
            <span className="text-gray-500">$</span> cd universal-react-monorepo
          </div>
          <div className="mb-4 text-gray-100">
            <span className="text-gray-500">$</span> pnpm install
          </div>
          <div className="mb-2 text-gray-400"># Start development</div>
          <div className="text-gray-100">
            <span className="text-gray-500">$</span> pnpm dev
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Runs both web and mobile apps simultaneously with hot reload
        </p>
      </div>
    </div>
  </section>
)

export function QuickStart() {
  return (
    <section className="py-16 px-6 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
          Quick Start
        </h2>

        <div className="max-w-lg mx-auto">
          <div className="bg-gray-900 rounded-lg p-5 font-mono text-sm">
            <div className="text-gray-400 mb-2"># Clone and install</div>
            <div className="text-gray-100 mb-3">
              <span className="text-gray-500">$</span> git clone https://github.com/gurselcakar/universal-react-monorepo.git
            </div>
            <div className="text-gray-100 mb-3">
              <span className="text-gray-500">$</span> cd universal-react-monorepo
            </div>
            <div className="text-gray-100 mb-4">
              <span className="text-gray-500">$</span> pnpm install
            </div>
            <div className="text-gray-400 mb-2"># Start development</div>
            <div className="text-gray-100">
              <span className="text-gray-500">$</span> pnpm dev
            </div>
          </div>

          <p className="text-sm text-gray-500 text-center mt-4">
            Runs both web and mobile apps simultaneously with hot reload
          </p>
        </div>
      </div>
    </section>
  )
}

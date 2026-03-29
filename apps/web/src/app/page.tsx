import { HelloWorld } from '@chalkboard/shared-frontend'

import { Header, Footer, Hero, TechStack, QuickStart } from '../components'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        <Hero />
        <div className="border-t border-gray-100 py-2">
          <HelloWorld />
        </div>
        <TechStack />
        <QuickStart />
      </main>

      <Footer />
    </div>
  )
}

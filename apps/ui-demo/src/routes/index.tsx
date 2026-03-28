import { createFileRoute } from '@tanstack/react-router'

import { Header, Footer, Hero, TechStack, QuickStart } from '@/components'

const Home = () => (
  <div className="flex min-h-screen flex-col bg-white">
    <Header />

    <main className="flex-1">
      <Hero />
      <TechStack />
      <QuickStart />
    </main>

    <Footer />
  </div>
)

export const Route = createFileRoute('/')({
  component: Home,
})

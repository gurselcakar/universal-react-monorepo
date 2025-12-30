import { createFileRoute } from '@tanstack/react-router'
import { Header, Footer, Hero, TechStack, QuickStart } from '@/components'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <Hero />
        <TechStack />
        <QuickStart />
      </main>

      <Footer />
    </div>
  )
}

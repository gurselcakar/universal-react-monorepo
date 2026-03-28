import { Header, Footer, Hero, TechStack, QuickStart } from '../components'

export default function Home() {
  return (
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
}

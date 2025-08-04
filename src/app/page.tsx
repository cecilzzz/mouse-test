import HeroSection from '@/components/layout/HeroSection'
import NavigationSection from '@/components/layout/NavigationSection'
import Footer from '@/components/layout/footer'
import MouseButtonTest from '@/components/features/MouseButtonTest'
import MouseTestFaq from '@/components/features/MouseTestFaq'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Mouse Button Test Tool */}
        <section className="mb-20">
          <MouseButtonTest />
        </section>

        {/* Quick Navigation */}
        <NavigationSection />

        {/* FAQ Section */}
        <MouseTestFaq />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

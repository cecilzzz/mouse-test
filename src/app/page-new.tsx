import HeroSection from '@/components/layout/hero-section'
import NavigationSection from '@/components/layout/navigation-section'
import Footer from '@/components/layout/footer'
import MouseButtonTest from '@/components/features/mouse-button-test'
import MouseTestFAQ from '@/components/features/mouse-test-faq'

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
        <MouseTestFAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

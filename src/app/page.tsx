import MouseButtonTest from '@/components/mouse-button-test'
import MouseTestFAQ from '@/components/mouse-test-faq'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Mouse Test - Complete Mouse Testing Tools Online
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Professional mouse testing suite for button functionality, click speed, DPI analysis, and performance optimization
            </p>
            <p className="text-muted-foreground">
              Test your mouse buttons, measure CPS (clicks per second), check DPI, and diagnose mouse performance issues instantly
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Mouse Button Test Tool */}
        <section className="mb-16">
          <MouseButtonTest />
        </section>

        {/* Quick Navigation */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">More Mouse Testing Tools</h2>
            <p className="text-muted-foreground">Comprehensive testing suite for all your mouse needs</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <a href="/cps" className="p-4 border rounded-lg hover:bg-accent transition-colors text-center">
              <div className="font-semibold">CPS Test</div>
              <div className="text-sm text-muted-foreground">Click Speed</div>
            </a>
            <a href="/dpi-test" className="p-4 border rounded-lg hover:bg-accent transition-colors text-center">
              <div className="font-semibold">DPI Test</div>
              <div className="text-sm text-muted-foreground">Sensitivity Check</div>
            </a>
            <a href="/double-click-test" className="p-4 border rounded-lg hover:bg-accent transition-colors text-center">
              <div className="font-semibold">Double Click</div>
              <div className="text-sm text-muted-foreground">Response Test</div>
            </a>
            <a href="/scroll-test" className="p-4 border rounded-lg hover:bg-accent transition-colors text-center">
              <div className="font-semibold">Scroll Test</div>
              <div className="text-sm text-muted-foreground">Wheel Function</div>
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <MouseTestFAQ />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Mouse Test. Professional mouse testing tools for gamers and professionals.</p>
            <p className="mt-2">Test mouse buttons, CPS, DPI, accuracy, and performance online.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

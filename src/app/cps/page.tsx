import { Metadata } from 'next'
import Footer from '@/components/layout/Footer'
import CpsTest from '@/components/features/cps/CpsTest'

export const metadata: Metadata = {
  title: "CPS Test - Click Speed Test Online | Mouse Test",
  description: "Test your click speed with our professional CPS (Clicks Per Second) testing tool. Measure how fast you can click with accurate timing and detailed statistics.",
  keywords: [
    "cps test", "click speed test", "clicks per second", "mouse click test", 
    "click rate test", "gaming mouse test", "click speed measurement"
  ],
  openGraph: {
    title: "CPS Test - Professional Click Speed Testing",
    description: "Measure your mouse clicking speed with our accurate CPS testing tool. Perfect for gamers and professionals.",
    url: "https://mousetest.com/cps",
  },
}

export default function CpsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-electric-500 to-cyber-pink-500 flex items-center justify-center shadow-lg shadow-electric-500/30">
              <span className="text-3xl">⚡</span>
            </div>
            <div>
              <h1 className="text-4xl font-black hero-gradient mb-2">
                CPS TEST CENTER
              </h1>
              <p className="text-xl font-mono text-electric-600 dark:text-electric-400">
                {'>> '}Professional Click Speed Testing Suite
              </p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test your click speed with our comprehensive CPS (Clicks Per Second) testing tools. 
            Choose from different durations and test types to measure your mouse performance.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Default 5 Second CPS Test */}
        <section className="mb-16">
          <CpsTest 
            duration={5} 
            title="5 SECOND CPS TEST"
            description=">> Standard Click Speed Test"
          />
        </section>

        {/* CPS Test Options */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black hero-gradient mb-4">
              CHOOSE YOUR TEST
            </h2>
            <p className="text-lg text-muted-foreground font-mono">
              {'>> '}Select test duration and type
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Duration Tests */}
            <a href="/cps/1-second" className="group">
              <div className="test-card p-6 text-center hover:scale-105 transition-transform">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-neon-green-500 to-electric-500 flex items-center justify-center shadow-lg shadow-neon-green-500/30">
                  <span className="text-xl font-black">1</span>
                </div>
                <h3 className="text-xl font-black text-neon-green-400 mb-2">1 SECOND</h3>
                <p className="text-sm text-muted-foreground font-mono">Lightning fast test</p>
              </div>
            </a>

            <a href="/cps/10-second" className="group">
              <div className="test-card p-6 text-center hover:scale-105 transition-transform">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-electric-500 to-cyber-pink-500 flex items-center justify-center shadow-lg shadow-electric-500/30">
                  <span className="text-lg font-black">10</span>
                </div>
                <h3 className="text-xl font-black text-electric-400 mb-2">10 SECOND</h3>
                <p className="text-sm text-muted-foreground font-mono">Extended precision</p>
              </div>
            </a>

            <a href="/cps/100-second" className="group">
              <div className="test-card p-6 text-center hover:scale-105 transition-transform">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-cyber-pink-500 to-warning-orange-500 flex items-center justify-center shadow-lg shadow-cyber-pink-500/30">
                  <span className="text-sm font-black">100</span>
                </div>
                <h3 className="text-xl font-black text-cyber-pink-400 mb-2">100 SECOND</h3>
                <p className="text-sm text-muted-foreground font-mono">Endurance challenge</p>
              </div>
            </a>

            <a href="/cps/right-click" className="group">
              <div className="test-card p-6 text-center hover:scale-105 transition-transform">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-warning-orange-500 to-hacker-purple-500 flex items-center justify-center shadow-lg shadow-warning-orange-500/30">
                  <span className="text-xl">🖱️</span>
                </div>
                <h3 className="text-xl font-black text-warning-orange-400 mb-2">RIGHT CLICK</h3>
                <p className="text-sm text-muted-foreground font-mono">Right button test</p>
              </div>
            </a>
          </div>
        </section>

        {/* Additional Test Types */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}SPECIAL TESTS
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <a href="/cps/spacebar" className="group">
              <div className="test-card p-6 text-center hover:scale-105 transition-transform bg-black/90 border-hacker-purple-500/50">
                <div className="text-4xl mb-4">⌨️</div>
                <h3 className="text-xl font-black text-hacker-purple-400 mb-2">SPACEBAR CPS</h3>
                <p className="text-sm text-muted-foreground font-mono">Keyboard speed test</p>
              </div>
            </a>

            <a href="/cps/mobile" className="group">
              <div className="test-card p-6 text-center hover:scale-105 transition-transform bg-black/90 border-electric-500/50">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-black text-electric-400 mb-2">MOBILE CPS</h3>
                <p className="text-sm text-muted-foreground font-mono">Touch screen test</p>
              </div>
            </a>

            <a href="/button-test" className="group">
              <div className="test-card p-6 text-center hover:scale-105 transition-transform bg-black/90 border-cyber-pink-500/50">
                <div className="text-4xl mb-4">🖱️</div>
                <h3 className="text-xl font-black text-cyber-pink-400 mb-2">BUTTON TEST</h3>
                <p className="text-sm text-muted-foreground font-mono">Hardware diagnostic</p>
              </div>
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-neon-green-400 mb-4 font-mono">
              {'>> '}CPS TEST FAQ
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-effect p-6 rounded-lg">
              <h3 className="text-lg font-bold text-electric-400 mb-3 font-mono">What is CPS?</h3>
              <p className="text-muted-foreground">
                CPS stands for &quot;Clicks Per Second&quot; - it measures how many times you can click 
                your mouse button in one second. It&apos;s commonly used to test mouse performance 
                and gaming skills.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <h3 className="text-lg font-bold text-electric-400 mb-3 font-mono">What&apos;s a good CPS score?</h3>
              <p className="text-muted-foreground">
                Average users achieve 3-6 CPS, while gamers often reach 8-12 CPS. 
                Professional players and speedclickers can achieve 15+ CPS with proper techniques.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <h3 className="text-lg font-bold text-electric-400 mb-3 font-mono">How to improve CPS?</h3>
              <p className="text-muted-foreground">
                Practice different clicking techniques like jitter clicking or butterfly clicking. 
                Use a gaming mouse with low latency, and maintain proper hand positioning.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <h3 className="text-lg font-bold text-electric-400 mb-3 font-mono">Which test duration is best?</h3>
              <p className="text-muted-foreground">
                5-10 seconds is ideal for most users. 1 second tests peak speed, 
                while longer tests measure consistency and endurance.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
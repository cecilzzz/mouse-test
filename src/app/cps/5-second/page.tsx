import { Metadata } from 'next'
import Footer from '@/components/layout/Footer'
import CpsTest from '@/components/features/cps/CpsTest'

export const metadata: Metadata = {
  title: "5 Second CPS Test - Standard Click Speed Test | Mouse Test",
  description: "The most popular CPS test duration. Test your clicking speed over 5 seconds for accurate and reliable click speed measurement.",
  keywords: [
    "5 second cps test", "standard cps test", "click speed test 5s", "mouse click rate", 
    "cps measurement", "5s click test", "gaming mouse test"
  ],
  openGraph: {
    title: "5 Second CPS Test - Standard Click Speed Measurement",
    description: "The gold standard for CPS testing. Measure your clicking speed accurately over 5 seconds.",
    url: "https://mousetest.com/cps/5-second",
  },
}

export default function FiveSecondCpsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-8 px-4 border-b border-neon-green-500/20">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-2xl font-black hero-gradient hover:scale-105 transition-transform">
                MOUSE TEST
              </a>
              <span className="text-muted-foreground font-mono">{'>'}</span>
              <a href="/cps" className="text-electric-400 font-mono hover:text-electric-300">CPS Test</a>
              <span className="text-muted-foreground font-mono">{'>'}</span>
              <span className="text-neon-green-400 font-mono font-bold">5 Second</span>
            </div>
            <div className="hidden md:flex gap-4">
              <a href="/cps/1-second" className="cyber-button px-4 py-2">1S Test</a>
              <a href="/cps/10-second" className="cyber-button px-4 py-2">10S Test</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <CpsTest 
          duration={5} 
          title="5 SECOND CPS TEST"
          description=">> Standard Click Speed Benchmark"
        />
        
        {/* Additional Info */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-neon-green-400 mb-4 font-mono">
              {'>> '}5 SECOND STANDARD
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-electric-500 to-cyber-pink-500 flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">GOLD STANDARD</h3>
              </div>
              <p className="text-muted-foreground text-center">
                The 5-second test is the most commonly used CPS benchmark. 
                It provides accurate results while being long enough to establish consistency.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-neon-green-500 to-electric-500 flex items-center justify-center">
                  <span className="text-xl">🏆</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">SCORE RANGES</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Casual: 3-5 CPS | Good: 6-8 CPS | Great: 9-11 CPS | Pro: 12+ CPS
                <br />
                Most competitive gamers score 8-12 CPS.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-cyber-pink-500 to-warning-orange-500 flex items-center justify-center">
                  <span className="text-xl">🎮</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">GAMING USE</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Perfect for testing gaming mouse performance. 
                Many esports players use 5-second tests to benchmark their equipment.
              </p>
            </div>
          </div>
        </section>

        {/* CPS Techniques */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}CLICKING TECHNIQUES
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-effect p-6 rounded-lg border-neon-green-500/30">
              <h4 className="text-lg font-bold text-neon-green-400 mb-3 font-mono">NORMAL CLICKING</h4>
              <p className="text-muted-foreground mb-3">
                Use your index finger to click normally. Most comfortable for extended use.
              </p>
              <div className="text-sm text-electric-400 font-mono">Expected: 3-6 CPS</div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-cyber-pink-500/30">
              <h4 className="text-lg font-bold text-cyber-pink-400 mb-3 font-mono">JITTER CLICKING</h4>
              <p className="text-muted-foreground mb-3">
                Tense your arm muscles to create rapid vibrations for faster clicking.
              </p>
              <div className="text-sm text-electric-400 font-mono">Expected: 8-14 CPS</div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-warning-orange-500/30">
              <h4 className="text-lg font-bold text-warning-orange-400 mb-3 font-mono">BUTTERFLY CLICKING</h4>
              <p className="text-muted-foreground mb-3">
                Use two fingers alternating on the mouse button for maximum speed.
              </p>
              <div className="text-sm text-electric-400 font-mono">Expected: 12-20 CPS</div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-hacker-purple-500/30">
              <h4 className="text-lg font-bold text-hacker-purple-400 mb-3 font-mono">DRAG CLICKING</h4>
              <p className="text-muted-foreground mb-3">
                Drag your finger across the mouse button to register multiple clicks.
              </p>
              <div className="text-sm text-electric-400 font-mono">Expected: 20+ CPS</div>
            </div>
          </div>
        </section>

        {/* Navigation to other tests */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}EXPLORE MORE TESTS
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/cps/1-second" className="cyber-button px-6 py-3">
              1 Second Test
            </a>
            <a href="/cps/10-second" className="cyber-button px-6 py-3">
              10 Second Test  
            </a>
            <a href="/cps/100-second" className="cyber-button px-6 py-3">
              100 Second Test
            </a>
            <a href="/cps/right-click" className="cyber-button px-6 py-3">
              Right Click Test
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
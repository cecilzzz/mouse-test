import { Metadata } from 'next'
import Footer from '@/components/layout/Footer'
import CpsTest from '@/components/features/cps/CpsTest'

export const metadata: Metadata = {
  title: "1 Second CPS Test - Lightning Fast Click Speed Test | Mouse Test",
  description: "Test your peak clicking speed with our 1-second CPS test. Perfect for measuring your maximum click rate and reflexes in a short burst.",
  keywords: [
    "1 second cps test", "quick cps test", "fast click test", "peak click speed", 
    "lightning cps", "burst click test", "1s cps"
  ],
  openGraph: {
    title: "1 Second CPS Test - Peak Speed Challenge",
    description: "Challenge your reflexes with the ultimate 1-second click speed test. How fast can you click?",
    url: "https://mousetest.com/cps/1-second",
  },
}

export default function OneSecondCpsPage() {
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
              <span className="text-neon-green-400 font-mono font-bold">1 Second</span>
            </div>
            <div className="hidden md:flex gap-4">
              <a href="/cps/5-second" className="cyber-button px-4 py-2">5S Test</a>
              <a href="/cps/10-second" className="cyber-button px-4 py-2">10S Test</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <CpsTest 
          duration={1} 
          title="1 SECOND CPS TEST"
          description=">> Lightning Fast Click Speed Challenge"
        />
        
        {/* Additional Info */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-neon-green-400 mb-4 font-mono">
              {'>> '}1 SECOND TEST INFO
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-neon-green-500 to-electric-500 flex items-center justify-center">
                  <span className="text-xl">⚡</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">REFLEX TEST</h3>
              </div>
              <p className="text-muted-foreground text-center">
                The 1-second test measures your peak clicking speed and reaction time. 
                Perfect for testing reflexes and maximum burst performance.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-cyber-pink-500 to-warning-orange-500 flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">PEAK SCORES</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Good: 4-6 CPS | Great: 7-9 CPS | Pro: 10+ CPS
                <br />
                Elite gamers can achieve 15+ CPS in short bursts.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-hacker-purple-500 to-electric-500 flex items-center justify-center">
                  <span className="text-xl">💡</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">PRO TIPS</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Use your wrist and fingers, not your whole arm. 
                Stay relaxed and maintain steady rhythm for best results.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation to other tests */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}TRY OTHER DURATIONS
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/cps/5-second" className="cyber-button px-6 py-3">
              5 Second Test
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
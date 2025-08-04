import { Metadata } from 'next'
import Footer from '@/components/layout/Footer'
import CpsTest from '@/components/features/cps/CpsTest'

export const metadata: Metadata = {
  title: "10 Second CPS Test - Extended Click Speed Test | Mouse Test",
  description: "Test your clicking consistency and endurance with our 10-second CPS test. Perfect for measuring sustained click performance and accuracy.",
  keywords: [
    "10 second cps test", "extended cps test", "click endurance test", "sustained click speed", 
    "10s cps", "consistency test", "endurance clicking"
  ],
  openGraph: {
    title: "10 Second CPS Test - Endurance Click Speed Challenge",
    description: "Test your clicking endurance and consistency over 10 seconds. Perfect for competitive gaming.",
    url: "https://mousetest.com/cps/10-second",
  },
}

export default function TenSecondCpsPage() {
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
              <span className="text-neon-green-400 font-mono font-bold">10 Second</span>
            </div>
            <div className="hidden md:flex gap-4">
              <a href="/cps/5-second" className="cyber-button px-4 py-2">5S Test</a>
              <a href="/cps/100-second" className="cyber-button px-4 py-2">100S Test</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <CpsTest 
          duration={10} 
          title="10 SECOND CPS TEST"
          description=">> Extended Endurance Challenge"
        />
        
        {/* Additional Info */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-neon-green-400 mb-4 font-mono">
              {'>> '}10 SECOND ENDURANCE
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-cyber-pink-500 to-warning-orange-500 flex items-center justify-center">
                  <span className="text-xl">💪</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">ENDURANCE TEST</h3>
              </div>
              <p className="text-muted-foreground text-center">
                The 10-second test measures your ability to maintain consistent clicking speed 
                over an extended period. Perfect for testing muscle endurance.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-electric-500 to-hacker-purple-500 flex items-center justify-center">
                  <span className="text-xl">📈</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">CONSISTENCY</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Good: 4-6 CPS | Great: 7-9 CPS | Pro: 10+ CPS
                <br />
                Expect 10-15% lower scores than shorter tests due to fatigue.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-neon-green-500 to-cyber-pink-500 flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">ACCURACY</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Longer duration provides more accurate average CPS measurements 
                and better represents real-world clicking scenarios.
              </p>
            </div>
          </div>
        </section>

        {/* Strategy Tips */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}10-SECOND STRATEGY
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-effect p-6 rounded-lg border-neon-green-500/30">
              <h4 className="text-lg font-bold text-neon-green-400 mb-3 font-mono">PACING STRATEGY</h4>
              <ul className="text-muted-foreground space-y-2">
                <li>• Start at 80% of your maximum speed</li>
                <li>• Maintain steady rhythm throughout</li>
                <li>• Save energy for final 3 seconds</li>
                <li>• Avoid early burnout</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-cyber-pink-500/30">
              <h4 className="text-lg font-bold text-cyber-pink-400 mb-3 font-mono">ENDURANCE TIPS</h4>
              <ul className="text-muted-foreground space-y-2">
                <li>• Keep your wrist relaxed</li>
                <li>• Use finger muscles, not arm</li>
                <li>• Breathe steadily throughout</li>
                <li>• Focus on consistency over speed</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-warning-orange-500/30">
              <h4 className="text-lg font-bold text-warning-orange-400 mb-3 font-mono">WARM-UP</h4>
              <ul className="text-muted-foreground space-y-2">
                <li>• Do 2-3 practice runs first</li>
                <li>• Stretch your fingers and wrist</li>
                <li>• Find comfortable hand position</li>
                <li>• Test your mouse sensitivity</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-hacker-purple-500/30">
              <h4 className="text-lg font-bold text-hacker-purple-400 mb-3 font-mono">RECOVERY</h4>
              <ul className="text-muted-foreground space-y-2">
                <li>• Rest 30 seconds between attempts</li>
                <li>• Shake out your hand gently</li>
                <li>• Don&apos;t over-practice in one session</li>
                <li>• Stop if you feel strain</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation to other tests */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}OTHER DURATIONS
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/cps/1-second" className="cyber-button px-6 py-3">
              1 Second Test
            </a>
            <a href="/cps/5-second" className="cyber-button px-6 py-3">
              5 Second Test  
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
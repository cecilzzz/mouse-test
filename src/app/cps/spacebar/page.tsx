import { Metadata } from 'next'
import SimplePageLayout from '@/components/layout/SimplePageLayout'
import CpsTestCore from '@/components/features/cps/CpsTestCore'

export const metadata: Metadata = {
  title: "Spacebar CPS Test - Keyboard Speed Test | Mouse Test",
  description: "Test your spacebar clicking speed with our keyboard CPS test. Perfect for testing keyboard responsiveness and finger speed on the space bar.",
  openGraph: {
    title: "Spacebar CPS Test - Keyboard Speed Challenge",
    description: "How fast can you press the spacebar? Test your keyboard speed with our spacebar CPS test.",
    url: "https://mousetest.com/cps/spacebar",
  },
}

export default function SpacebarCpsPage() {
  return (
    <SimplePageLayout
      title="SPACEBAR CPS TEST"
      subtitle=">> KEYBOARD SPEED CHALLENGE <<"
      description="Test your spacebar clicking speed with our keyboard CPS test. Perfect for testing keyboard responsiveness and finger speed on the space bar. Press the spacebar as fast as you can when the test starts."
    >
      <section className="mb-20">
        <CpsTestCore 
          duration={5} 
          testType="spacebar"
          title="SPACEBAR CPS TEST"
          description=">> Keyboard Speed Challenge"
        />
      </section>
        
      <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-neon-green-400 mb-4 font-mono">
              {'>> '}KEYBOARD WARRIOR MODE
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-electric-500 to-hacker-purple-500 flex items-center justify-center">
                  <span className="text-xl">👍</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">THUMB POWER</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Tests your thumb speed and keyboard responsiveness. The spacebar is the largest 
                key and typically the most responsive on mechanical keyboards.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-cyber-pink-500 to-warning-orange-500 flex items-center justify-center">
                  <span className="text-xl">⚡</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">SWITCH TYPES</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Different keyboard switches affect performance. Mechanical switches typically 
                allow faster pressing than membrane keyboards due to shorter travel distance.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-neon-green-500 to-electric-500 flex items-center justify-center">
                  <span className="text-xl">📈</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">TYPICAL SCORES</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Generally higher than mouse CPS. Good: 6-8 CPS | Great: 9-12 CPS | Pro: 13+ CPS
                <br />
                Gaming keyboards can achieve 15+ CPS with optimal switches.
              </p>
            </div>
          </div>
        </section>

      <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}KEYBOARD PERFORMANCE GUIDE
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-effect p-6 rounded-lg border-rgb-red/30">
              <h4 className="text-lg font-bold text-rgb-red mb-3 font-mono">MEMBRANE</h4>
              <p className="text-muted-foreground text-sm mb-3">Rubber dome switches</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• 4-6 CPS typical</li>
                <li>• Higher resistance</li>
                <li>• Mushier feel</li>
                <li>• Budget-friendly</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-warning-orange-500/30">
              <h4 className="text-lg font-bold text-warning-orange-400 mb-3 font-mono">SCISSOR</h4>
              <p className="text-muted-foreground text-sm mb-3">Laptop-style switches</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• 5-7 CPS typical</li>
                <li>• Low profile</li>
                <li>• Decent response</li>
                <li>• Quiet operation</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-electric-500/30">
              <h4 className="text-lg font-bold text-electric-400 mb-3 font-mono">MECHANICAL</h4>
              <p className="text-muted-foreground text-sm mb-3">Individual switches</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• 8-12 CPS typical</li>
                <li>• Fast response</li>
                <li>• Tactile feedback</li>
                <li>• Gaming preferred</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-neon-green-500/30">
              <h4 className="text-lg font-bold text-neon-green-400 mb-3 font-mono">OPTICAL</h4>
              <p className="text-muted-foreground text-sm mb-3">Light-based switches</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• 10-15+ CPS</li>
                <li>• Zero debounce</li>
                <li>• Ultra-fast</li>
                <li>• Competition grade</li>
              </ul>
            </div>
          </div>
        </section>

      <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}SPACEBAR TECHNIQUES
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-effect p-6 rounded-lg border-electric-500/30">
              <h4 className="text-lg font-bold text-electric-400 mb-3 font-mono">SINGLE THUMB</h4>
              <p className="text-muted-foreground mb-3">
                Use your dominant thumb exclusively. Most natural and comfortable method 
                for extended typing and gaming sessions.
              </p>
              <div className="text-sm text-cyber-pink-400 font-mono">Best for: Comfort and consistency</div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-neon-green-500/30">
              <h4 className="text-lg font-bold text-neon-green-400 mb-3 font-mono">ALTERNATING THUMBS</h4>
              <p className="text-muted-foreground mb-3">
                Switch between left and right thumbs for maximum speed. Requires practice 
                but can achieve significantly higher CPS rates.
              </p>
              <div className="text-sm text-cyber-pink-400 font-mono">Best for: Maximum speed</div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-warning-orange-500/30">
              <h4 className="text-lg font-bold text-warning-orange-400 mb-3 font-mono">VIBRATION METHOD</h4>
              <p className="text-muted-foreground mb-3">
                Create rapid vibrations with your thumb or hand to achieve ultra-high speeds. 
                Similar to jitter clicking but with thumbs.
              </p>
              <div className="text-sm text-cyber-pink-400 font-mono">Best for: Peak performance</div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-cyber-pink-500/30">
              <h4 className="text-lg font-bold text-cyber-pink-400 mb-3 font-mono">MULTI-FINGER</h4>
              <p className="text-muted-foreground mb-3">
                Some advanced users use multiple fingers on the spacebar. Technically possible 
                but requires specialized keyboard positioning.
              </p>
              <div className="text-sm text-cyber-pink-400 font-mono">Best for: Experimental setups</div>
            </div>
          </div>
        </section>

      <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}SPACEBAR IN GAMING
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-effect p-6 rounded-lg border-rgb-red/30">
              <div className="text-center mb-4">
                <span className="text-4xl">🏃</span>
                <h4 className="text-lg font-bold text-rgb-red mt-2 font-mono">MOVEMENT</h4>
              </div>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Jumping in platformers</li>
                <li>• Sprinting in FPS games</li>
                <li>• Dodging in action games</li>
                <li>• Swimming in open world</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-neon-green-500/30">
              <div className="text-center mb-4">
                <span className="text-4xl">⚔️</span>
                <h4 className="text-lg font-bold text-neon-green-400 mt-2 font-mono">COMBAT</h4>
              </div>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Blocking attacks</li>
                <li>• Special abilities</li>
                <li>• Weapon switching</li>
                <li>• Counter-attacks</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-cyber-pink-500/30">
              <div className="text-center mb-4">
                <span className="text-4xl">🎮</span>
                <h4 className="text-lg font-bold text-cyber-pink-400 mt-2 font-mono">GENERAL</h4>
              </div>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Menu navigation</li>
                <li>• Dialog skipping</li>
                <li>• Pause/resume</li>
                <li>• Quick actions</li>
              </ul>
            </div>
          </div>
        </section>

      <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}TEST OTHER INPUTS
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/cps/5-second" className="cyber-button px-6 py-3">
              Left Click Test
            </a>
            <a href="/cps/right-click" className="cyber-button px-6 py-3">
              Right Click Test  
            </a>
            <a href="/cps/mobile" className="cyber-button px-6 py-3">
              Mobile Touch Test
            </a>
            <a href="/button-test" className="cyber-button px-6 py-3">
              Full Mouse Test
            </a>
          </div>
        </section>
    </SimplePageLayout>
  )
}
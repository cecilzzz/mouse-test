import { Metadata } from 'next'
import SimplePageLayout from '@/components/layout/SimplePageLayout'
import CpsTestCore from '@/components/features/cps/CpsTestCore'

export const metadata: Metadata = {
  title: "Right Click CPS Test - Right Mouse Button Speed Test | Mouse Test",
  description: "Test your right-click speed with our specialized right mouse button CPS test. Perfect for testing right-click performance in gaming and professional use.",
  keywords: [
    "right click cps test", "right mouse button test", "right click speed", "rmb cps test", 
    "right button speed test", "context menu speed", "right click performance"
  ],
  openGraph: {
    title: "Right Click CPS Test - Right Mouse Button Speed Challenge",
    description: "Test your right mouse button clicking speed. See how fast you can right-click!",
    url: "https://mousetest.com/cps/right-click",
  },
}

export default function RightClickCpsPage() {
  return (
    <SimplePageLayout
      title="RIGHT CLICK CPS TEST"
      subtitle=">> RIGHT MOUSE BUTTON SPEED CHALLENGE <<"
      description="Test your right-click speed with our specialized right mouse button CPS test. Perfect for testing right-click performance in gaming and professional use. Context menus will be disabled during the test."
    >
      <section className="mb-20">
        <CpsTestCore 
          duration={5} 
          testType="right"
          title="RIGHT CLICK CPS TEST"
          description=">> Right Mouse Button Speed Challenge"
        />
      </section>
        
      <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-neon-green-400 mb-4 font-mono">
              {'>> '}RIGHT BUTTON SPECIALIST
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-warning-orange-500 to-rgb-red flex items-center justify-center">
                  <span className="text-xl">👆</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">RIGHT FINGER</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Tests your middle finger clicking ability. Most people find right-clicking 
                slightly more challenging than left-clicking due to finger positioning.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-electric-500 to-cyber-pink-500 flex items-center justify-center">
                  <span className="text-xl">🎮</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">GAMING USE</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Important for FPS games, MMORPGs, and strategy games where right-click 
                is used for aiming, secondary actions, or context menus.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-cyber-pink-500 to-hacker-purple-500 flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">EXPECTATIONS</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Typical scores are 10-20% lower than left-click due to weaker middle finger. 
                Good: 3-5 CPS | Great: 6-8 CPS | Pro: 9+ CPS
              </p>
            </div>
          </div>
        </section>

      <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}RIGHT-CLICK TECHNIQUES
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-effect p-6 rounded-lg border-warning-orange-500/30">
              <h4 className="text-lg font-bold text-warning-orange-400 mb-3 font-mono">STANDARD TECHNIQUE</h4>
              <p className="text-muted-foreground mb-3">
                Use your middle finger exclusively. Keep your index finger on the left button 
                for stability and proper hand positioning.
              </p>
              <div className="text-sm text-electric-400 font-mono">Most comfortable for long sessions</div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-cyber-pink-500/30">
              <h4 className="text-lg font-bold text-cyber-pink-400 mb-3 font-mono">GAMING GRIP</h4>
              <p className="text-muted-foreground mb-3">
                Claw grip with fingers arched high. Provides better control and faster 
                response times for competitive gaming scenarios.
              </p>
              <div className="text-sm text-electric-400 font-mono">Better for speed and precision</div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-electric-500/30">
              <h4 className="text-lg font-bold text-electric-400 mb-3 font-mono">ALTERNATING METHOD</h4>
              <p className="text-muted-foreground mb-3">
                Some users alternate between middle and ring finger for rapid right-clicking. 
                Requires practice but can achieve higher CPS rates.
              </p>
              <div className="text-sm text-electric-400 font-mono">Advanced technique only</div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-neon-green-500/30">
              <h4 className="text-lg font-bold text-neon-green-400 mb-3 font-mono">ERGONOMIC TIPS</h4>
              <p className="text-muted-foreground mb-3">
                Keep your wrist straight and palm relaxed. Avoid using too much force - 
                modern mice require very light pressure to register clicks.
              </p>
              <div className="text-sm text-electric-400 font-mono">Prevents strain and fatigue</div>
            </div>
          </div>
        </section>

      <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}GAMING APPLICATIONS
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-effect p-6 rounded-lg border-rgb-red/30">
              <h4 className="text-lg font-bold text-rgb-red mb-3 font-mono">FPS GAMES</h4>
              <p className="text-muted-foreground text-sm mb-3">First Person Shooters</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Aiming down sights</li>
                <li>• Secondary fire modes</li>
                <li>• Grenade throwing</li>
                <li>• Weapon switching</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-neon-green-500/30">
              <h4 className="text-lg font-bold text-neon-green-400 mb-3 font-mono">RTS GAMES</h4>
              <p className="text-muted-foreground text-sm mb-3">Real-Time Strategy</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Unit movement commands</li>
                <li>• Building placement</li>
                <li>• Context menus</li>
                <li>• Camera controls</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-cyber-pink-500/30">
              <h4 className="text-lg font-bold text-cyber-pink-400 mb-3 font-mono">MMORPG</h4>
              <p className="text-muted-foreground text-sm mb-3">MMO RPG Games</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Interact with NPCs</li>
                <li>• Loot management</li>
                <li>• Targeting enemies</li>
                <li>• Menu navigation</li>
              </ul>
            </div>
          </div>
        </section>

      <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}OTHER BUTTON TESTS
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/cps/5-second" className="cyber-button px-6 py-3">
              Left Click Test
            </a>
            <a href="/cps/spacebar" className="cyber-button px-6 py-3">
              Spacebar Test  
            </a>
            <a href="/cps/mobile" className="cyber-button px-6 py-3">
              Mobile Touch Test
            </a>
            <a href="/button-test" className="cyber-button px-6 py-3">
              Full Button Test
            </a>
          </div>
        </section>
    </SimplePageLayout>
  )
}
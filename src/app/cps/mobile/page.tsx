import { Metadata } from 'next'
import SimplePageLayout from '@/components/layout/SimplePageLayout'
import CpsTestCore from '@/components/features/cps/CpsTestCore'

export const metadata: Metadata = {
  title: "Mobile CPS Test - Touch Screen Speed Test | Mouse Test",
  description: "Test your touch screen tapping speed with our mobile CPS test. Perfect for smartphones, tablets, and touchscreen devices.",
  openGraph: {
    title: "Mobile CPS Test - Touch Screen Speed Challenge",
    description: "How fast can you tap your phone screen? Test your mobile tapping speed!",
    url: "https://mousetest.com/cps/mobile",
  },
}

export default function MobileCpsPage() {
  return (
    <SimplePageLayout
      title="MOBILE CPS TEST"
      subtitle=">> TOUCH SCREEN SPEED CHALLENGE <<"
      description="Test your touch screen tapping speed with our mobile CPS test. Perfect for smartphones, tablets, and touchscreen devices. Optimized for mobile touch interfaces."
    >
      <section className="mb-20">
        <CpsTestCore 
          duration={5} 
          testType="mobile"
          title="MOBILE CPS TEST"
          description=">> Touch Screen Speed Challenge"
        />
      </section>
        
      <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-neon-green-400 mb-4 font-mono">
              {'>> '}MOBILE OPTIMIZATION
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-cyber-pink-500 to-electric-500 flex items-center justify-center">
                  <span className="text-xl">👆</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">TOUCH RESPONSE</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Tests your finger tapping speed and device touch responsiveness. 
                Modern touchscreens can detect taps faster than mechanical switches.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-electric-500 to-neon-green-500 flex items-center justify-center">
                  <span className="text-xl">📱</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">DEVICE TYPES</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Works on smartphones, tablets, and touchscreen laptops. 
                Performance varies by device refresh rate and touch sensitivity.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-neon-green-500 to-warning-orange-500 flex items-center justify-center">
                  <span className="text-xl">⚡</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">HIGH SCORES</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Mobile CPS can be surprisingly high! Good: 8-12 CPS | Great: 13-17 CPS | Pro: 18+ CPS
                <br />
                Gaming phones often achieve the highest scores.
              </p>
            </div>
          </div>
        </section>

      <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}MOBILE TAPPING TECHNIQUES
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-effect p-6 rounded-lg border-cyber-pink-500/30">
              <h4 className="text-lg font-bold text-cyber-pink-400 mb-3 font-mono">SINGLE FINGER</h4>
              <p className="text-muted-foreground mb-3">
                Use your index finger exclusively. Most comfortable and allows for 
                precise tapping without accidental touches.
              </p>
              <div className="text-sm text-electric-400 font-mono">Best for: Accuracy and control</div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-electric-500/30">
              <h4 className="text-lg font-bold text-electric-400 mb-3 font-mono">ALTERNATING FINGERS</h4>
              <p className="text-muted-foreground mb-3">
                Switch between index and middle finger for maximum speed. 
                Works great on larger screens like tablets.
              </p>
              <div className="text-sm text-electric-400 font-mono">Best for: Maximum speed</div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-neon-green-500/30">
              <h4 className="text-lg font-bold text-neon-green-400 mb-3 font-mono">THUMB TAPPING</h4>
              <p className="text-muted-foreground mb-3">
                Use thumbs for one-handed operation. Perfect for smaller phones 
                and when you need to hold the device steady.
              </p>
              <div className="text-sm text-electric-400 font-mono">Best for: One-handed use</div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-warning-orange-500/30">
              <h4 className="text-lg font-bold text-warning-orange-400 mb-3 font-mono">MULTI-TOUCH</h4>
              <p className="text-muted-foreground mb-3">
                Advanced technique using multiple fingers simultaneously. 
                Can achieve extreme speeds but requires precise coordination.
              </p>
              <div className="text-sm text-electric-400 font-mono">Best for: Record attempts</div>
            </div>
          </div>
        </section>

      <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}DEVICE OPTIMIZATION
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-effect p-6 rounded-lg border-rgb-red/30">
              <h4 className="text-lg font-bold text-rgb-red mb-3 font-mono">REFRESH RATE</h4>
              <p className="text-muted-foreground text-sm mb-3">Screen refresh rate</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• 60Hz: Standard</li>
                <li>• 90Hz: Smoother</li>
                <li>• 120Hz: Gaming</li>
                <li>• 144Hz+: Pro level</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-warning-orange-500/30">
              <h4 className="text-lg font-bold text-warning-orange-400 mb-3 font-mono">TOUCH RATE</h4>
              <p className="text-muted-foreground text-sm mb-3">Touch sampling rate</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• 60Hz: Basic</li>
                <li>• 120Hz: Good</li>
                <li>• 240Hz: Gaming</li>
                <li>• 480Hz+: Esports</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-electric-500/30">
              <h4 className="text-lg font-bold text-electric-400 mb-3 font-mono">PERFORMANCE</h4>
              <p className="text-muted-foreground text-sm mb-3">Device settings</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• High performance mode</li>
                <li>• Disable power saving</li>
                <li>• Close background apps</li>
                <li>• Gaming mode on</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-neon-green-500/30">
              <h4 className="text-lg font-bold text-neon-green-400 mb-3 font-mono">ENVIRONMENT</h4>
              <p className="text-muted-foreground text-sm mb-3">Optimal conditions</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Clean screen</li>
                <li>• Dry fingers</li>
                <li>• Stable position</li>
                <li>• Good lighting</li>
              </ul>
            </div>
          </div>
        </section>

      <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}MOBILE GAMING APPLICATIONS
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-effect p-6 rounded-lg border-cyber-pink-500/30">
              <div className="text-center mb-4">
                <span className="text-4xl">🎮</span>
                <h4 className="text-lg font-bold text-cyber-pink-400 mt-2 font-mono">ACTION GAMES</h4>
              </div>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Rapid fire shooting</li>
                <li>• Combo execution</li>
                <li>• Quick time events</li>
                <li>• Fighting game inputs</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-electric-500/30">
              <div className="text-center mb-4">
                <span className="text-4xl">🎯</span>
                <h4 className="text-lg font-bold text-electric-400 mt-2 font-mono">RHYTHM GAMES</h4>
              </div>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Beat matching</li>
                <li>• Multi-finger patterns</li>
                <li>• Speed sections</li>
                <li>• Accuracy challenges</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-neon-green-500/30">
              <div className="text-center mb-4">
                <span className="text-4xl">🚀</span>
                <h4 className="text-lg font-bold text-neon-green-400 mt-2 font-mono">CASUAL GAMES</h4>
              </div>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Tap to jump/fly</li>
                <li>• Cookie clickers</li>
                <li>• Match-3 games</li>
                <li>• Reflex challenges</li>
              </ul>
            </div>
          </div>
        </section>

      <section className="mb-16">
          <div className="glass-effect p-8 rounded-lg border-neon-green-500/50">
            <div className="text-center mb-6">
              <h3 className="text-xl font-black text-neon-green-400 mb-4 font-mono">
                💡 MOBILE CPS PRO TIPS
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-bold text-electric-400 mb-3 font-mono">PREPARATION</h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Clean your screen thoroughly</li>
                  <li>• Remove any screen protector bubbles</li>
                  <li>• Ensure hands are clean and dry</li>
                  <li>• Find a comfortable, stable position</li>
                  <li>• Use landscape mode for larger tap area</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-electric-400 mb-3 font-mono">TECHNIQUE</h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Keep finger movements minimal</li>
                  <li>• Tap lightly - don&apos;t press hard</li>
                  <li>• Stay in the center of the tap area</li>
                  <li>• Maintain steady rhythm</li>
                  <li>• Practice finger independence</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}DESKTOP ALTERNATIVES
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/cps/5-second" className="cyber-button px-6 py-3">
              Mouse CPS Test
            </a>
            <a href="/cps/right-click" className="cyber-button px-6 py-3">
              Right Click Test  
            </a>
            <a href="/cps/spacebar" className="cyber-button px-6 py-3">
              Keyboard Test
            </a>
            <a href="/button-test" className="cyber-button px-6 py-3">
              Full Button Test
            </a>
          </div>
        </section>
    </SimplePageLayout>
  )
}
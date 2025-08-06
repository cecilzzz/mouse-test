import { Metadata } from 'next'
import SimplePageLayout from '@/components/layout/SimplePageLayout'
import CpsTestCore from '@/components/features/cps/CpsTestCore'

export const metadata: Metadata = {
  title: "100 Second CPS Test - Ultimate Endurance Challenge | Mouse Test",
  description: "The ultimate clicking endurance test. Challenge yourself with 100 seconds of continuous clicking to test your stamina and consistency.",
  keywords: [
    "100 second cps test", "endurance cps test", "ultimate click test", "marathon clicking", 
    "100s cps", "stamina test", "extreme endurance clicking"
  ],
  openGraph: {
    title: "100 Second CPS Test - Ultimate Endurance Challenge",
    description: "Think you can click for 100 seconds straight? Test your ultimate clicking endurance.",
    url: "https://mousetest.com/cps/100-second",
  },
}

export default function HundredSecondCpsPage() {
  return (
    <SimplePageLayout
      title="100 SECOND CPS TEST"
      subtitle=">> ULTIMATE ENDURANCE MARATHON <<"
      description="The ultimate clicking endurance test. Challenge yourself with 100 seconds of continuous clicking to test your stamina and consistency. ⚠️ EXTREME CHALLENGE - Take breaks if you feel discomfort."
    >
      <section className="mb-20">
        <CpsTestCore 
          duration={100} 
          title="100 SECOND CPS TEST"
          description=">> Ultimate Endurance Marathon"
        />
      </section>
        
      <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-neon-green-400 mb-4 font-mono">
              {'>> '}EXTREME ENDURANCE MODE
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-effect p-6 rounded-lg border-rgb-red/30">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-rgb-red to-warning-orange-500 flex items-center justify-center">
                  <span className="text-xl">🔥</span>
                </div>
                <h3 className="text-lg font-bold text-rgb-red mb-3 font-mono">ULTIMATE TEST</h3>
              </div>
              <p className="text-muted-foreground text-center">
                The 100-second test is the ultimate endurance challenge. 
                Only the most dedicated clickers attempt this marathon test.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-warning-orange-500 to-hacker-purple-500 flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">REALISTIC SCORES</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Good: 2-4 CPS | Great: 5-7 CPS | Pro: 8+ CPS
                <br />
                Expect significant fatigue and reduced performance over time.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-electric-500 to-cyber-pink-500 flex items-center justify-center">
                  <span className="text-xl">🏆</span>
                </div>
                <h3 className="text-lg font-bold text-electric-400 font-mono">ELITE CLUB</h3>
              </div>
              <p className="text-muted-foreground text-center">
                Completing this test puts you in an elite group of endurance clickers. 
                Few people can maintain speed for the full duration.
              </p>
            </div>
          </div>
        </section>

      <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}MARATHON STRATEGY
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-effect p-6 rounded-lg border-neon-green-500/30">
              <h4 className="text-lg font-bold text-neon-green-400 mb-3 font-mono">PHASE 1: 0-25s</h4>
              <p className="text-muted-foreground text-sm mb-3">Starting Strong</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Start at 70% max speed</li>
                <li>• Establish rhythm</li>
                <li>• Conserve energy</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-electric-500/30">
              <h4 className="text-lg font-bold text-electric-400 mb-3 font-mono">PHASE 2: 25-50s</h4>
              <p className="text-muted-foreground text-sm mb-3">Finding Groove</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Maintain steady pace</li>
                <li>• Focus on consistency</li>
                <li>• Monitor fatigue</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-warning-orange-500/30">
              <h4 className="text-lg font-bold text-warning-orange-400 mb-3 font-mono">PHASE 3: 50-75s</h4>
              <p className="text-muted-foreground text-sm mb-3">The Wall</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Fight through fatigue</li>
                <li>• Adjust technique</li>
                <li>• Stay motivated</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-lg border-cyber-pink-500/30">
              <h4 className="text-lg font-bold text-cyber-pink-400 mb-3 font-mono">PHASE 4: 75-100s</h4>
              <p className="text-muted-foreground text-sm mb-3">Final Push</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Give everything you have</li>
                <li>• Sprint to finish</li>
                <li>• Victory celebration</li>
              </ul>
            </div>
          </div>
        </section>

      <section className="mb-16">
          <div className="glass-effect p-8 rounded-lg border-rgb-red/50 bg-rgb-red/10">
            <div className="text-center mb-6">
              <h3 className="text-xl font-black text-rgb-red mb-4 font-mono">
                ⚠️ HEALTH & SAFETY WARNING
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-bold text-warning-orange-400 mb-3 font-mono">BEFORE YOU START</h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Warm up your hands and wrists</li>
                  <li>• Ensure proper ergonomic setup</li>
                  <li>• Stay hydrated</li>
                  <li>• Don&apos;t attempt if you have RSI</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-warning-orange-400 mb-3 font-mono">STOP IMMEDIATELY IF</h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>• You feel pain or discomfort</li>
                  <li>• Your hand starts cramping</li>
                  <li>• You experience numbness</li>
                  <li>• You feel dizzy or strained</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                This test is for entertainment purposes only. Listen to your body and prioritize your health.
              </p>
            </div>
          </div>
        </section>

      <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-electric-400 mb-4 font-mono">
              {'>> '}SHORTER ALTERNATIVES
            </h3>
            <p className="text-muted-foreground">Try these less extreme tests first</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/cps/1-second" className="cyber-button px-6 py-3">
              1 Second Test
            </a>
            <a href="/cps/5-second" className="cyber-button px-6 py-3">
              5 Second Test  
            </a>
            <a href="/cps/10-second" className="cyber-button px-6 py-3">
              10 Second Test
            </a>
            <a href="/cps/right-click" className="cyber-button px-6 py-3">
              Right Click Test
            </a>
          </div>
        </section>
    </SimplePageLayout>
  )
}
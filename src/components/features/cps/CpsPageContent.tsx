'use client'

import { useState, useCallback } from 'react'
import TestPageLayout from '@/components/layout/TestPageLayout'
import ConfigurableHeroSection from '@/components/layout/ConfigurableHeroSection'
import CpsTestCore from '@/components/features/cps/CpsTestCore'
import TestStatsPanel from '@/components/shared/TestStatsPanel'
import QuickActionsPanel from '@/components/shared/QuickActionsPanel'
import { Timer, Target, Settings, Zap } from 'lucide-react'

/**
 * CpsPageContent Component
 * 
 * CPS頁面的主要內容組件，包含所有client-side邏輯。
 * 從主頁面組件分離出來以避免Next.js metadata導出衝突。
 */
const CpsPageContent: React.FC = () => {
  const [stats, setStats] = useState({
    clickCount: 0,
    timeLeft: 5,
    cps: 0,
    bestScore: 0
  })
  const [error, setError] = useState<string | null>(null)

  const handleStatsChange = useCallback((newStats: typeof stats) => {
    setStats(newStats)
  }, [])

  const handleError = useCallback((error: string | null) => {
    setError(error)
  }, [])

  const heroConfig = {
    title: "CPS TEST CENTER",
    subtitle: ">> Professional Click Speed Testing Suite",
    description: "Test your click speed with our comprehensive CPS (Clicks Per Second) testing tools. Choose from different durations and test types to measure your mouse performance.",
    icon: <Timer className="w-10 h-10 text-black" />,
    secondIcon: <span className="text-3xl">⚡</span>,
    badges: [
      { icon: Target, text: "INSTANT RESULTS", color: "neon-green" as const },
      { icon: Settings, text: "NO INSTALL", color: "electric" as const },
      { icon: Zap, text: "GAMING READY", color: "cyber-pink" as const }
    ]
  }

  const statsItems = [
    { label: "CLICKS", value: stats.clickCount, variant: "neon-green" as const },
    { label: "TIME LEFT", value: `${stats.timeLeft.toFixed(1)}s`, variant: "cyber-pink" as const },
    { label: "BEST", value: stats.bestScore.toFixed(2), variant: "warning-orange" as const }
  ]

  const quickActions = [
    { label: "1 SECOND >", href: "/cps/1-second", variant: "cyber" as const },
    { label: "5 SECOND >", href: "/cps/5-second", variant: "cyber" as const },
    { label: "10 SECOND >", href: "/cps/10-second", variant: "cyber" as const },
    { label: "BUTTON TEST >", href: "/button-test", variant: "purple" as const }
  ]

  return (
    <TestPageLayout
      hero={<ConfigurableHeroSection config={heroConfig} />}
      testArea={(
        <CpsTestCore
          duration={5}
          title="5 SECOND CPS TEST"
          description=">> Standard Click Speed Test"
          onStatsChange={handleStatsChange}
          onError={handleError}
        />
      )}
      sidebar={(
        <>
          <TestStatsPanel
            title="LIVE STATS"
            mainStat={{ value: stats.cps.toFixed(2), label: "CURRENT CPS" }}
            stats={statsItems}
            error={error}
            onErrorDismiss={() => setError(null)}
          />
          <QuickActionsPanel
            title="QUICK TESTS"
            actions={quickActions}
          />
        </>
      )}
    >
      {/* Test Options Grid */}
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
    </TestPageLayout>
  )
}

export default CpsPageContent
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

      {/* Complete CPS Guide Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black hero-gradient mb-4">
            CPS TEST COMPREHENSIVE GUIDE
          </h2>
          <p className="text-lg text-muted-foreground font-mono">
            {'>> '}Master Click Speed Testing - From Beginner to Pro
          </p>
        </div>
        
        {/* What is CPS */}
        <div className="glass-effect p-8 rounded-lg mb-8">
          <h3 className="text-2xl font-black text-neon-green-400 mb-4 font-mono">
            {'>> '}WHAT IS CPS TESTING?
          </h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            CPS (Clicks Per Second) testing is the fundamental measurement of mouse clicking speed and performance. 
            Originally developed for competitive gaming evaluation, CPS testing has become the industry standard 
            for assessing mouse responsiveness, user reaction time, and hardware performance.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Professional esports players, hardware reviewers, and gaming enthusiasts rely on CPS measurements 
            to optimize their setup and track performance improvements. Our testing suite provides laboratory-grade 
            precision with millisecond accuracy for both casual users and competitive professionals.
          </p>
        </div>

        {/* Test Duration Comparison */}
        <div className="mb-12">
          <h3 className="text-2xl font-black text-electric-400 mb-6 font-mono text-center">
            {'>> '}TEST DURATION GUIDE
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-effect p-6 text-center border-2 border-neon-green-500/30">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="text-lg font-black text-neon-green-400 mb-3">1 SECOND</h4>
              <p className="text-sm text-muted-foreground mb-2">Peak Speed Test</p>
              <p className="text-xs text-gray-400">Measures maximum burst clicking speed and instant reflexes</p>
            </div>
            
            <div className="glass-effect p-6 text-center border-2 border-electric-500/30">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="text-lg font-black text-electric-400 mb-3">5 SECOND</h4>
              <p className="text-sm text-muted-foreground mb-2">Standard Benchmark</p>
              <p className="text-xs text-gray-400">Industry standard for comparing performance across users</p>
            </div>
            
            <div className="glass-effect p-6 text-center border-2 border-cyber-pink-500/30">
              <div className="text-3xl mb-3">💪</div>
              <h4 className="text-lg font-black text-cyber-pink-400 mb-3">10 SECOND</h4>
              <p className="text-sm text-muted-foreground mb-2">Consistency Test</p>
              <p className="text-xs text-gray-400">Tests sustained performance and clicking stability</p>
            </div>
            
            <div className="glass-effect p-6 text-center border-2 border-warning-orange-500/30">
              <div className="text-3xl mb-3">🏋️</div>
              <h4 className="text-lg font-black text-warning-orange-400 mb-3">100 SECOND</h4>
              <p className="text-sm text-muted-foreground mb-2">Endurance Challenge</p>
              <p className="text-xs text-gray-400">Ultimate test of stamina and muscle endurance</p>
            </div>
          </div>
        </div>

        {/* Performance Benchmarks */}
        <div className="mb-12">
          <h3 className="text-2xl font-black text-cyber-pink-400 mb-6 font-mono text-center">
            {'>> '}PERFORMANCE BENCHMARKS
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-effect p-6 border-2 border-gray-600/30">
              <h4 className="text-lg font-black text-gray-400 mb-4 text-center">BEGINNER</h4>
              <div className="text-center mb-4">
                <span className="text-3xl font-black text-gray-400">3-6</span>
                <span className="text-sm text-muted-foreground ml-2">CPS</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Casual computer users</li>
                <li>• Learning basic techniques</li>
                <li>• Standard office mice</li>
                <li>• No specific training</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 border-2 border-electric-500/50">
              <h4 className="text-lg font-black text-electric-400 mb-4 text-center">GAMER</h4>
              <div className="text-center mb-4">
                <span className="text-3xl font-black text-electric-400">8-12</span>
                <span className="text-sm text-muted-foreground ml-2">CPS</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Active PC gamers</li>
                <li>• Gaming mouse users</li>
                <li>• Basic click techniques</li>
                <li>• Regular practice</li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 border-2 border-cyber-pink-500/50">
              <h4 className="text-lg font-black text-cyber-pink-400 mb-4 text-center">PRO LEVEL</h4>
              <div className="text-center mb-4">
                <span className="text-3xl font-black text-cyber-pink-400">15+</span>
                <span className="text-sm text-muted-foreground ml-2">CPS</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Professional esports players</li>
                <li>• Advanced techniques</li>
                <li>• High-end gaming equipment</li>
                <li>• Dedicated training</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick FAQ Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-black text-warning-orange-400 mb-6 font-mono text-center">
            {'>> '}QUICK ANSWERS
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-effect p-6 rounded-lg">
              <h4 className="text-lg font-bold text-electric-400 mb-3 font-mono">How to improve CPS?</h4>
              <p className="text-muted-foreground mb-3">
                Practice different clicking techniques like jitter clicking or butterfly clicking. 
                Use a gaming mouse with low latency, and maintain proper hand positioning.
              </p>
              <div className="text-sm text-gray-400">
                <strong>Quick tips:</strong> Warm up first • Use fingertips • Keep wrist stable
              </div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <h4 className="text-lg font-bold text-electric-400 mb-3 font-mono">Which test duration is best?</h4>
              <p className="text-muted-foreground mb-3">
                5-10 seconds is ideal for most users. 1 second tests peak speed, 
                while longer tests measure consistency and endurance.
              </p>
              <div className="text-sm text-gray-400">
                <strong>Recommendation:</strong> Start with 5s • Try 10s for accuracy • Use 1s for max speed
              </div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <h4 className="text-lg font-bold text-electric-400 mb-3 font-mono">Does mouse matter for CPS?</h4>
              <p className="text-muted-foreground mb-3">
                Yes! Gaming mice have lower input lag, better switches, and higher polling rates. 
                A good gaming mouse can improve your CPS by 10-20%.
              </p>
              <div className="text-sm text-gray-400">
                <strong>Look for:</strong> High polling rate • Low click latency • Durable switches
              </div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <h4 className="text-lg font-bold text-electric-400 mb-3 font-mono">Is high CPS useful for gaming?</h4>
              <p className="text-muted-foreground mb-3">
                Absolutely! Games like Minecraft PvP, FPS titles, and MOBAs benefit from higher CPS. 
                It improves reaction time and gives competitive advantages.
              </p>
              <div className="text-sm text-gray-400">
                <strong>Games:</strong> Minecraft PvP • Osu! • Cookie Clicker • FPS games
              </div>
            </div>
          </div>
        </div>
      </section>
    </TestPageLayout>
  )
}

export default CpsPageContent
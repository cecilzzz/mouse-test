import MouseButtonTest from '@/components/mouse-button-test'
import MouseTestFAQ from '@/components/mouse-test-faq'
import { Mouse, Zap, Target, Settings, Terminal } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b-2 border-neon-green-500/30">
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/80 to-black/90" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #00ff41 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }} />
        
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-neon-green-500 to-electric-500 flex items-center justify-center shadow-lg shadow-neon-green-500/50 border-2 border-neon-green-400">
                <Mouse className="w-10 h-10 text-black" />
              </div>
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-electric-500 to-cyber-pink-500 flex items-center justify-center shadow-lg shadow-electric-500/50 animate-pulse border-2 border-electric-400">
                <Terminal className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="hero-gradient block">MOUSE TEST</span>
              <span className="block text-2xl lg:text-3xl text-electric-400 font-mono mt-4">
                {'>> GAMING HARDWARE DIAGNOSTICS <<'}
              </span>
            </h1>
            
            <p className="text-xl text-foreground mb-8 leading-relaxed max-w-4xl mx-auto font-mono">
              <span className="text-neon-green-400">PROFESSIONAL</span> mouse testing suite for{' '}
              <span className="text-electric-400">button functionality</span>, {' '}
              <span className="text-cyber-pink-400">click speed (CPS)</span>, {' '}
              <span className="text-warning-orange-400">DPI analysis</span>, and {' '}
              <span className="text-hacker-purple-400">performance optimization</span>
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-3 bg-black/80 border-2 border-neon-green-500/50 rounded-lg font-mono">
                <Target className="w-4 h-4 text-neon-green-500" />
                <span className="text-neon-green-400">INSTANT RESULTS</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 bg-black/80 border-2 border-electric-500/50 rounded-lg font-mono">
                <Settings className="w-4 h-4 text-electric-500" />
                <span className="text-electric-400">NO INSTALL</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 bg-black/80 border-2 border-cyber-pink-500/50 rounded-lg font-mono">
                <Zap className="w-4 h-4 text-cyber-pink-500" />
                <span className="text-cyber-pink-400">GAMING READY</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Mouse Button Test Tool */}
        <section className="mb-20">
          <MouseButtonTest />
        </section>

        {/* Quick Navigation */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">
              <span className="hero-gradient">TESTING ARSENAL</span>
            </h2>
            <p className="text-lg font-mono max-w-3xl mx-auto text-electric-400">
              {'>> COMPLETE HARDWARE DIAGNOSTICS SUITE <<'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <a href="/cps" className="group test-card p-6 text-center hover:scale-105 transition-all duration-300 bg-black/90 border-neon-green-500/50 hover:border-neon-green-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-neon-green-500 to-neon-green-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-neon-green-400">
                <Zap className="w-8 h-8 text-black" />
              </div>
              <div className="font-black text-xl mb-2 font-mono text-neon-green-400">CPS TEST</div>
              <div className="text-sm text-muted-foreground font-mono">MEASURE CLICK SPEED</div>
            </a>
            
            <a href="/dpi-test" className="group test-card p-6 text-center hover:scale-105 transition-all duration-300 bg-black/90 border-electric-500/50 hover:border-electric-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-electric-500 to-electric-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-electric-400">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="font-black text-xl mb-2 font-mono text-electric-400">DPI TEST</div>
              <div className="text-sm text-muted-foreground font-mono">SENSITIVITY CHECK</div>
            </a>
            
            <a href="/double-click-test" className="group test-card p-6 text-center hover:scale-105 transition-all duration-300 bg-black/90 border-cyber-pink-500/50 hover:border-cyber-pink-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-cyber-pink-500 to-cyber-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-cyber-pink-400">
                <Mouse className="w-8 h-8 text-white" />
              </div>
              <div className="font-black text-xl mb-2 font-mono text-cyber-pink-400">DOUBLE CLICK</div>
              <div className="text-sm text-muted-foreground font-mono">RESPONSE TEST</div>
            </a>
            
            <a href="/scroll-test" className="group test-card p-6 text-center hover:scale-105 transition-all duration-300 bg-black/90 border-warning-orange-500/50 hover:border-warning-orange-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-warning-orange-500 to-warning-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-warning-orange-400">
                <Settings className="w-8 h-8 text-black" />
              </div>
              <div className="font-black text-xl mb-2 font-mono text-warning-orange-400">SCROLL TEST</div>
              <div className="text-sm text-muted-foreground font-mono">WHEEL FUNCTION</div>
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <MouseTestFAQ />
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-neon-green-500/30 bg-black/90">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm space-y-3">
            <p className="font-mono font-bold text-electric-400">
              {'>> MOUSE TEST © 2025 - GAMING HARDWARE DIAGNOSTICS <<'}
            </p>
            <p className="text-muted-foreground font-mono">
              Professional testing for <span className="text-neon-green-400">CPS</span> | <span className="text-electric-400">DPI</span> | <span className="text-cyber-pink-400">BUTTONS</span> | <span className="text-warning-orange-400">ACCURACY</span> | <span className="text-hacker-purple-400">PERFORMANCE</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-xs font-mono">
              <span className="text-neon-green-400">🎮 GAMING OPTIMIZED</span>
              <span className="text-electric-400">⚡ INSTANT RESULTS</span>
              <span className="text-cyber-pink-400">🎯 PRO GRADE</span>
              <span className="text-warning-orange-400">📱 MOBILE READY</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

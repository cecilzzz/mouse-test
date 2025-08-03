import { Mouse, Zap, Target, Settings, Terminal } from 'lucide-react'

/**
 * HeroSection Component
 * 
 * Displays the main hero section of the Mouse Test website with cyberpunk/gaming aesthetics.
 * Features animated background effects, gradient text, and feature badges.
 * 
 * @component
 * @example
 * ```tsx
 * <HeroSection />
 * ```
 * 
 * @returns {JSX.Element} The rendered hero section with title, description, and feature badges
 * 
 * @features
 * - Cyberpunk-themed visual design with neon colors
 * - Animated grid pattern background overlay
 * - Multiple gradient layers for depth
 * - Interactive feature badges with icons
 * - Fully responsive layout
 * 
 * @design
 * - Uses gaming color palette (neon-green, electric, cyber-pink)
 * - JetBrains Mono font for technical aesthetic
 * - Glass-morphism effects on feature badges
 * - Hover animations and transitions
 */
const HeroSection: React.FC = () => {
  return (
    <header className="relative overflow-hidden border-b-2 border-neon-green-500/30">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/80 to-black/90" />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #00ff41 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }} 
      />
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo Icons */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-neon-green-500 to-electric-500 flex items-center justify-center shadow-lg shadow-neon-green-500/50 border-2 border-neon-green-400">
              <Mouse className="w-10 h-10 text-black" />
            </div>
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-electric-500 to-cyber-pink-500 flex items-center justify-center shadow-lg shadow-electric-500/50 animate-pulse border-2 border-electric-400">
              <Terminal className="w-10 h-10 text-white" />
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="hero-gradient block">MOUSE TEST</span>
            <span className="block text-2xl lg:text-3xl text-electric-400 font-mono mt-4">
              {'>> GAMING HARDWARE DIAGNOSTICS <<'}
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl text-foreground mb-8 leading-relaxed max-w-4xl mx-auto font-mono">
            <span className="text-neon-green-400">PROFESSIONAL</span> mouse testing suite for{' '}
            <span className="text-electric-400">button functionality</span>, {' '}
            <span className="text-cyber-pink-400">click speed (CPS)</span>, {' '}
            <span className="text-warning-orange-400">DPI analysis</span>, and {' '}
            <span className="text-hacker-purple-400">performance optimization</span>
          </p>
          
          {/* Feature Badges */}
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
  )
}

export default HeroSection

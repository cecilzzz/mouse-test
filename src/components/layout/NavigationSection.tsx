import { Zap, Target, Mouse, Settings, MousePointer2, Heart, Play } from 'lucide-react'
import type { TestTool } from '@/types'

/**
 * NavigationSection Component
 * 
 * Renders a grid of navigation cards for different mouse testing tools.
 * Each card represents a specific testing functionality with unique styling.
 * 
 * @component
 * @example
 * ```tsx
 * <NavigationSection />
 * ```
 * 
 * @returns {JSX.Element} A responsive grid of test tool navigation cards
 * 
 * @features
 * - CPS Test: Measures clicks per second for gaming performance
 * - DPI Test: Checks mouse sensitivity and precision
 * - Double Click Test: Validates double-click functionality
 * - Scroll Test: Tests scroll wheel responsiveness
 * 
 * @design
 * - Each card has unique gradient colors and hover effects
 * - Responsive grid layout (1 column mobile, 2 columns tablet, 4 columns desktop)
 * - Gaming-themed icons from Lucide React
 * - Glassmorphism effects with backdrop blur
 * - Hover animations with scale and glow effects
 * 
 * @data
 * Uses TestTool[] array with properties:
 * - href: Navigation URL for the test
 * - icon: Lucide React icon component
 * - title: Display name of the test
 * - description: Short description of functionality
 * - gradient: CSS gradient classes for styling
 * - border: Border color classes
 * - iconColor: Icon color classes
 * - titleColor: Title text color classes
 */
const NavigationSection: React.FC = () => {
  const testTools: TestTool[] = [
    {
      href: '/cps',
      icon: Zap,
      title: 'CPS TEST',
      description: 'MEASURE CLICK SPEED',
      gradient: 'from-neon-green-500 to-neon-green-600',
      border: 'border-neon-green-500/50 hover:border-neon-green-500',
      iconColor: 'text-black',
      titleColor: 'text-neon-green-400',
      borderColor: 'border-neon-green-400'
    },
    {
      href: '/dpi-test',
      icon: Target,
      title: 'DPI TEST',
      description: 'SENSITIVITY CHECK',
      gradient: 'from-electric-500 to-electric-600',
      border: 'border-electric-500/50 hover:border-electric-500',
      iconColor: 'text-white',
      titleColor: 'text-electric-400',
      borderColor: 'border-electric-400'
    },
    {
      href: '/double-click-test',
      icon: Mouse,
      title: 'DOUBLE CLICK',
      description: 'RESPONSE TEST',
      gradient: 'from-cyber-pink-500 to-cyber-pink-600',
      border: 'border-cyber-pink-500/50 hover:border-cyber-pink-500',
      iconColor: 'text-white',
      titleColor: 'text-cyber-pink-400',
      borderColor: 'border-cyber-pink-400'
    },
    {
      href: '/scroll-test',
      icon: Settings,
      title: 'SCROLL TEST',
      description: 'WHEEL FUNCTION',
      gradient: 'from-warning-orange-500 to-warning-orange-600',
      border: 'border-warning-orange-500/50 hover:border-warning-orange-500',
      iconColor: 'text-black',
      titleColor: 'text-warning-orange-400',
      borderColor: 'border-warning-orange-400'
    },
    {
      href: '/button-test',
      icon: MousePointer2,
      title: 'BUTTON TEST',
      description: 'ALL BUTTONS',
      gradient: 'from-electric-500 to-neon-green-500',
      border: 'border-electric-500/50 hover:border-electric-500',
      iconColor: 'text-white',
      titleColor: 'text-electric-400',
      borderColor: 'border-electric-400'
    },
    {
      href: '/gaming/jitter-click',
      icon: Zap,
      title: 'JITTER CLICK',
      description: 'GAMING TECHNIQUE',
      gradient: 'from-hacker-purple-500 to-neon-green-500',
      border: 'border-hacker-purple-500/50 hover:border-hacker-purple-500',
      iconColor: 'text-white',
      titleColor: 'text-hacker-purple-400',
      borderColor: 'border-hacker-purple-400'
    },
    {
      href: '/gaming/butterfly-click',
      icon: Heart,
      title: 'BUTTERFLY CLICK',
      description: 'FINGER COORDINATION',
      gradient: 'from-cyber-pink-500 to-electric-500',
      border: 'border-cyber-pink-500/50 hover:border-cyber-pink-500',
      iconColor: 'text-white',
      titleColor: 'text-cyber-pink-400',
      borderColor: 'border-cyber-pink-400'
    },
    {
      href: '/gaming/minecraft-cps',
      icon: Play,
      title: 'MINECRAFT CPS',
      description: 'PVP OPTIMIZATION',
      gradient: 'from-neon-green-500 to-warning-orange-500',
      border: 'border-neon-green-500/50 hover:border-neon-green-500',
      iconColor: 'text-black',
      titleColor: 'text-neon-green-400',
      borderColor: 'border-neon-green-400'
    }
  ]

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black mb-4">
          <span className="hero-gradient">TESTING ARSENAL</span>
        </h2>
        <p className="text-lg font-mono max-w-3xl mx-auto text-electric-400">
          {'>> COMPLETE HARDWARE DIAGNOSTICS SUITE <<'}
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {testTools.map((tool) => {
          const Icon = tool.icon
          return (
            <a 
              key={tool.href}
              href={tool.href} 
              className={`group test-card p-6 text-center hover:scale-105 transition-all duration-300 bg-black/90 ${tool.border}`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 ${tool.borderColor}`}>
                <Icon className={`w-8 h-8 ${tool.iconColor}`} />
              </div>
              <div className={`font-black text-xl mb-2 font-mono ${tool.titleColor}`}>
                {tool.title}
              </div>
              <div className="text-sm text-muted-foreground font-mono">
                {tool.description}
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}

export default NavigationSection

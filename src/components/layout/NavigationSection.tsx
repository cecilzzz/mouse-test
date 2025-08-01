import { Zap, Target, Mouse, Settings } from 'lucide-react'
import type { TestTool } from '@/types'

interface NavigationSectionProps {}

const NavigationSection: React.FC<NavigationSectionProps> = () => {
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
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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

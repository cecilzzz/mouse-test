'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface HeroConfig {
  title: string
  subtitle?: string
  description?: string
  icon?: React.ReactNode
  secondIcon?: React.ReactNode
  badges?: Array<{
    icon: LucideIcon
    text: string
    color: 'neon-green' | 'electric' | 'cyber-pink' | 'warning-orange' | 'hacker-purple'
  }>
}

interface ConfigurableHeroSectionProps {
  config: HeroConfig
  className?: string
}

/**
 * ConfigurableHeroSection Component
 * 
 * 可配置的Hero區域組件，支持不同的標題、描述、圖標和徽章配置。
 * 用於替代硬編碼的HeroSection，提供更大的靈活性。
 * 
 * @component
 * @example
 * ```tsx
 * const heroConfig = {
 *   title: "CPS TEST CENTER",
 *   subtitle: ">> Professional Click Speed Testing Suite",
 *   description: "Test your click speed with comprehensive tools...",
 *   icon: <Timer className="w-10 h-10 text-black" />,
 *   badges: [...]
 * }
 * <ConfigurableHeroSection config={heroConfig} />
 * ```
 * 
 * @param config - Hero配置對象
 * @param className - 額外的CSS類名
 * 
 * @returns {JSX.Element} 配置好的hero區域
 * 
 * @features
 * - 完全可配置的標題、副標題和描述
 * - 支持自定義圖標
 * - 可配置的特性徽章
 * - 保持cyberpunk/gaming美學
 * - 響應式設計
 * 
 * @design
 * - 使用漸變背景和網格圖案
 * - 支持多種顏色主題的徽章
 * - 圖標容器有漸變效果和陰影
 * - 字體使用JetBrains Mono保持技術感
 */
const ConfigurableHeroSection: React.FC<ConfigurableHeroSectionProps> = ({
  config,
  className = ''
}) => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      'neon-green': {
        border: 'border-neon-green-500/50',
        text: 'text-neon-green-400',
        icon: 'text-neon-green-500'
      },
      'electric': {
        border: 'border-electric-500/50',
        text: 'text-electric-400',
        icon: 'text-electric-500'
      },
      'cyber-pink': {
        border: 'border-cyber-pink-500/50',
        text: 'text-cyber-pink-400',
        icon: 'text-cyber-pink-500'
      },
      'warning-orange': {
        border: 'border-warning-orange-500/50',
        text: 'text-warning-orange-400',
        icon: 'text-warning-orange-500'
      },
      'hacker-purple': {
        border: 'border-hacker-purple-500/50',
        text: 'text-hacker-purple-400',
        icon: 'text-hacker-purple-500'
      }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap['neon-green']
  }

  return (
    <header className={`relative overflow-hidden border-b-2 border-neon-green-500/30 ${className}`}>
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
          {/* Icons */}
          {(config.icon || config.secondIcon) && (
            <div className="flex items-center justify-center gap-6 mb-8">
              {config.icon && (
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-neon-green-500 to-electric-500 flex items-center justify-center shadow-lg shadow-neon-green-500/50 border-2 border-neon-green-400">
                  {config.icon}
                </div>
              )}
              {config.secondIcon && (
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-electric-500 to-cyber-pink-500 flex items-center justify-center shadow-lg shadow-electric-500/50 animate-pulse border-2 border-electric-400">
                  {config.secondIcon}
                </div>
              )}
            </div>
          )}
          
          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="hero-gradient block">{config.title}</span>
            {config.subtitle && (
              <span className="block text-lg lg:text-2xl text-electric-400 font-mono mt-4">
                {config.subtitle}
              </span>
            )}
          </h1>
          
          {/* Description */}
          {config.description && (
            <p className="text-lg text-foreground mb-8 leading-relaxed max-w-4xl mx-auto font-mono">
              {config.description}
            </p>
          )}
          
          {/* Feature Badges */}
          {config.badges && config.badges.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              {config.badges.map((badge, index) => {
                const colors = getColorClasses(badge.color)
                const IconComponent = badge.icon
                return (
                  <div 
                    key={index}
                    className={`flex items-center gap-2 px-4 py-3 bg-black/80 border-2 ${colors.border} rounded-lg font-mono`}
                  >
                    <IconComponent className={`w-4 h-4 ${colors.icon}`} />
                    <span className={colors.text}>{badge.text}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default ConfigurableHeroSection
'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface ActionItem {
  label: string
  href?: string
  onClick?: () => void
  icon?: LucideIcon
  variant?: 'default' | 'outline' | 'cyber' | 'warning' | 'purple'
  disabled?: boolean
  external?: boolean
}

interface QuickActionsPanelProps {
  title?: string
  actions: ActionItem[]
  className?: string
}

/**
 * QuickActionsPanel Component
 * 
 * 統一的快速操作面板組件，用於顯示相關的測試導航和操作按鈕。
 * 可在所有測試頁面重用，提供一致的快速操作界面。
 * 
 * @component
 * @example
 * ```tsx
 * <QuickActionsPanel
 *   title="QUICK TESTS"
 *   actions={[
 *     { label: "1 SECOND >", href: "/cps/1-second", variant: "cyber" },
 *     { label: "5 SECOND >", href: "/cps/5-second", variant: "cyber" },
 *     { label: "RESET ALL", onClick: handleReset, variant: "warning", icon: RotateCcw },
 *     { label: "BUTTON TEST >", href: "/button-test", variant: "purple" }
 *   ]}
 * />
 * ```
 * 
 * @param title - 面板標題 (默認: "QUICK ACTIONS")
 * @param actions - 操作項目數組
 * @param className - 額外CSS類名
 * 
 * @returns {JSX.Element} 快速操作面板組件
 * 
 * @features
 * - 支持內部和外部鏈接
 * - 支持點擊回調函數
 * - 多種按鈕樣式變體
 * - 圖標支持
 * - 禁用狀態支持
 * - Cyberpunk/gaming美學設計
 * 
 * @design
 * - 使用Card組件保持一致性
 * - 按鈕樣式遵循遊戲主題
 * - 支持多種顏色變體
 * - 全寬按鈕佈局
 * - 適當的間距和圓角
 */
const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({
  title = "QUICK ACTIONS",
  actions,
  className = ''
}) => {
  const getButtonClasses = (variant?: string) => {
    const baseClasses = "w-full font-mono font-bold"
    
    switch (variant) {
      case 'cyber':
        return `${baseClasses} bg-gradient-to-r from-electric-600 to-cyber-pink-600 border-2 border-electric-400 text-white hover:from-electric-500 hover:to-cyber-pink-500 hover:shadow-lg hover:shadow-electric-500/50 active:scale-95 transition-all duration-150`
      case 'warning':
        return `${baseClasses} border-2 border-warning-orange-500 text-warning-orange-400 hover:bg-warning-orange-500 hover:text-black transition-all duration-150`
      case 'purple':
        return `${baseClasses} border-2 border-hacker-purple-500 text-hacker-purple-400 hover:bg-hacker-purple-500 hover:text-white transition-all duration-150`
      case 'outline':
        return `${baseClasses} border-2 border-electric-500 text-electric-400 hover:bg-electric-500 hover:text-black transition-all duration-150`
      default:
        return `${baseClasses} bg-gradient-to-r from-electric-600 to-cyber-pink-600 border-2 border-electric-400 text-white hover:from-electric-500 hover:to-cyber-pink-500 hover:shadow-lg hover:shadow-electric-500/50 active:scale-95 transition-all duration-150`
    }
  }

  const renderActionButton = (action: ActionItem, index: number) => {
    const buttonClasses = getButtonClasses(action.variant)
    const IconComponent = action.icon

    const buttonContent = (
      <>
        {IconComponent && <IconComponent className="w-4 h-4" />}
        {action.label}
      </>
    )

    // For cyber buttons, we use custom styling; for others, use Button variants
    const usesCustomStyling = action.variant === 'cyber'
    
    const buttonProps = {
      disabled: action.disabled,
      ...(usesCustomStyling ? {} : { variant: 'outline' as const })
    }

    // If it's a link
    if (action.href) {
      if (action.external) {
        return (
          <Button key={index} {...buttonProps} asChild>
            <a 
              href={action.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`gap-2 ${buttonClasses}`}
            >
              {buttonContent}
            </a>
          </Button>
        )
      } else {
        return (
          <Button key={index} {...buttonProps} asChild>
            <Link href={action.href} className={`gap-2 ${buttonClasses}`}>
              {buttonContent}
            </Link>
          </Button>
        )
      }
    }

    // If it's a click handler
    if (action.onClick) {
      return (
        <Button 
          key={index}
          {...buttonProps}
          onClick={action.onClick}
          className={`gap-2 ${buttonClasses}`}
        >
          {buttonContent}
        </Button>
      )
    }

    // Fallback - disabled button
    return (
      <Button 
        key={index}
        {...buttonProps}
        disabled={true}
        className={`gap-2 ${buttonClasses}`}
      >
        {buttonContent}
      </Button>
    )
  }

  return (
    <Card className={`test-card bg-black/90 border-cyber-pink-500/50 ${className}`}>
      <CardHeader>
        <CardTitle className="text-cyber-pink-400 font-mono">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => renderActionButton(action, index))}
      </CardContent>
    </Card>
  )
}

export default QuickActionsPanel
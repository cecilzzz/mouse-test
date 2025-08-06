'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Zap, AlertTriangle } from 'lucide-react'

interface StatItem {
  label: string
  value: string | number
  variant?: 'default' | 'neon-green' | 'electric' | 'cyber-pink' | 'warning-orange' | 'hacker-purple'
}

interface TestStatsPanelProps {
  title?: string
  mainStat?: {
    value: string | number
    label: string
  }
  stats: StatItem[]
  error?: string | null
  onErrorDismiss?: () => void
  className?: string
}

/**
 * TestStatsPanel Component
 * 
 * 統一的測試統計面板組件，用於顯示測試結果和實時統計數據。
 * 可在所有測試頁面重用，提供一致的統計信息展示。
 * 
 * @component
 * @example
 * ```tsx
 * <TestStatsPanel
 *   title="LIVE STATS"
 *   mainStat={{ value: "12.5", label: "CURRENT CPS" }}
 *   stats={[
 *     { label: "CLICKS", value: 125, variant: "neon-green" },
 *     { label: "TIME LEFT", value: "8.3s", variant: "cyber-pink" },
 *     { label: "BEST", value: "15.2", variant: "warning-orange" }
 *   ]}
 *   error={errorMessage}
 *   onErrorDismiss={() => setError(null)}
 * />
 * ```
 * 
 * @param title - 面板標題 (默認: "LIVE STATS")
 * @param mainStat - 主要統計數據 (大號顯示)
 * @param stats - 統計項目數組
 * @param error - 錯誤消息
 * @param onErrorDismiss - 錯誤消息消除回調
 * @param className - 額外CSS類名
 * 
 * @returns {JSX.Element} 統計面板組件
 * 
 * @features
 * - 支持主要統計數據的大號顯示
 * - 多種顏色變體的統計項目
 * - 錯誤消息顯示和消除
 * - Cyberpunk/gaming美學設計
 * - 完全響應式佈局
 * 
 * @design
 * - 使用Card組件保持一致性
 * - Badge組件展示統計值
 * - 支持多種顏色主題
 * - 錯誤狀態有特殊樣式
 */
const TestStatsPanel: React.FC<TestStatsPanelProps> = ({
  title = "LIVE STATS",
  mainStat,
  stats,
  error,
  onErrorDismiss,
  className = ''
}) => {
  const getBadgeClasses = (variant?: string) => {
    switch (variant) {
      case 'neon-green':
        return 'bg-black border-neon-green-500 text-neon-green-400 border-2'
      case 'electric':
        return 'bg-black border-electric-500 text-electric-400 border-2'
      case 'cyber-pink':
        return 'bg-black border-cyber-pink-500 text-cyber-pink-400 border-2'
      case 'warning-orange':
        return 'bg-black border-warning-orange-500 text-warning-orange-400 border-2'
      case 'hacker-purple':
        return 'bg-black border-hacker-purple-500 text-hacker-purple-400 border-2'
      default:
        return 'bg-black border-neon-green-500 text-neon-green-400 border-2'
    }
  }

  return (
    <Card className={`test-card bg-black/90 border-electric-500/50 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-electric-400 font-mono">
          <Zap className="w-5 h-5 text-neon-green-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Error Display */}
        {error && (
          <div className="p-3 bg-rgb-red/20 border border-rgb-red/50 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rgb-red mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-rgb-red font-mono">{error}</p>
                {onErrorDismiss && (
                  <Button 
                    onClick={onErrorDismiss} 
                    variant="outline" 
                    size="sm"
                    className="mt-2 text-xs border-rgb-red/50 text-rgb-red hover:bg-rgb-red/10"
                  >
                    Dismiss
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Main Stat Display */}
        {mainStat && (
          <div className="text-center">
            <div className="cps-counter mb-2">{mainStat.value}</div>
            <p className="text-sm text-muted-foreground font-mono">{mainStat.label}</p>
          </div>
        )}
        
        {/* Stats List */}
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-2 bg-gray-900/50 rounded border border-gray-700"
            >
              <span className="text-sm font-mono font-bold text-electric-400">
                {stat.label}:
              </span>
              <Badge className={`font-mono ${getBadgeClasses(stat.variant)}`}>
                {stat.value}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TestStatsPanel
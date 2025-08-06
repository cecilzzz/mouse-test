'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { RotateCcw, Mouse, Zap } from 'lucide-react'
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import type { MouseButtonState, ClickCount } from '@/types'

interface MouseButtonStats {
  totalClicks: number
  buttonCounts: ClickCount
  activeButtons: MouseButtonState
}

interface MouseButtonTestCoreProps {
  onStatsChange?: (stats: MouseButtonStats) => void
  onError?: (error: string | null) => void
  className?: string
}

/**
 * MouseButtonTestCore Component
 * 
 * 純鼠標按鈕測試邏輯組件，不包含佈局。專注於按鈕檢測功能。
 * 通過回調函數與外部組件通信，提供實時統計數據。
 * 
 * @component
 * @example
 * ```tsx
 * <MouseButtonTestCore
 *   onStatsChange={handleStats}
 *   onError={handleError}
 * />
 * ```
 * 
 * @param onStatsChange - 統計數據變化回調
 * @param onError - 錯誤處理回調
 * @param className - 額外CSS類名
 * 
 * @returns {JSX.Element} 純鼠標按鈕測試組件
 * 
 * @features
 * - 純測試邏輯，無佈局干擾
 * - 實時鼠標按鈕檢測（左、右、中、後退、前進）
 * - 視覺反饋和點擊計數
 * - 活動狀態指示
 * - 重置功能
 * - 實時統計數據回調
 * 
 * @design
 * - 專注於核心測試功能
 * - 通過props回調與外部通信
 * - 保持cyberpunk/gaming視覺風格
 * - 可視化鼠標圖表
 * - RGB發光效果當按鈕活動時
 */
const MouseButtonTestCore: React.FC<MouseButtonTestCoreProps> = ({
  onStatsChange,
  onError: _onError, // eslint-disable-line @typescript-eslint/no-unused-vars
  className = ''
}) => {
  const [buttonStates, setButtonStates] = useState<MouseButtonState>({
    left: false,
    right: false,
    middle: false,
    back: false,
    forward: false
  })

  const [clickCounts, setClickCounts] = useState<ClickCount>({
    left: 0,
    right: 0,
    middle: 0,
    back: 0,
    forward: 0
  })

  // Notify parent of stats changes
  useEffect(() => {
    const totalClicks = Object.values(clickCounts).reduce((sum, count) => sum + count, 0)
    onStatsChange?.({
      totalClicks,
      buttonCounts: clickCounts,
      activeButtons: buttonStates
    })
  }, [clickCounts, buttonStates, onStatsChange])

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    const button = event.button
    
    setButtonStates(prev => {
      const newState = { ...prev }
      switch (button) {
        case 0: newState.left = true; break
        case 1: newState.middle = true; break
        case 2: newState.right = true; break
        case 3: newState.back = true; break
        case 4: newState.forward = true; break
      }
      return newState
    })

    setClickCounts(prev => {
      const newCounts = { ...prev }
      switch (button) {
        case 0: newCounts.left++; break
        case 1: newCounts.middle++; break
        case 2: newCounts.right++; break
        case 3: newCounts.back++; break
        case 4: newCounts.forward++; break
      }
      return newCounts
    })
  }, [])

  const handleMouseUp = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    const button = event.button
    
    setButtonStates(prev => {
      const newState = { ...prev }
      switch (button) {
        case 0: newState.left = false; break
        case 1: newState.middle = false; break
        case 2: newState.right = false; break
        case 3: newState.back = false; break
        case 4: newState.forward = false; break
      }
      return newState
    })
  }, [])

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
  }, [])

  const resetTest = useCallback(() => {
    setButtonStates({
      left: false,
      right: false,
      middle: false,
      back: false,
      forward: false
    })
    setClickCounts({
      left: 0,
      right: 0,
      middle: 0,
      back: 0,
      forward: 0
    })
  }, [])

  const totalClicks = Object.values(clickCounts).reduce((sum, count) => sum + count, 0)
  const hasActiveButtons = Object.values(buttonStates).some(state => state)

  return (
    <Card className={`test-card ${className}`}>
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-green-500 to-electric-500 flex items-center justify-center shadow-lg shadow-neon-green-500/30">
            <Mouse className="w-6 h-6 text-black" />
          </div>
          <div>
            <CardTitle className="text-3xl font-black hero-gradient">
              MOUSE BUTTON TEST
            </CardTitle>
            <CardDescription className="text-lg mt-1 font-mono text-electric-600 dark:text-electric-400">
              {'>> Gaming Hardware Diagnostic Tool'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Mouse Visual */}
        <div className="flex justify-center">
          <div 
            className="relative bg-black border-2 border-neon-green-500/50 rounded-xl p-8 cursor-pointer select-none w-80 h-96 shadow-xl shadow-neon-green-500/20 hover:shadow-neon-green-500/40 transition-all duration-300"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onContextMenu={handleContextMenu}
          >
            {/* Left Button */}
            <div 
              className={`absolute top-3 left-3 w-28 h-36 rounded-tl-xl border-2 transition-all duration-150 mouse-button ${
                buttonStates.left 
                  ? 'mouse-button-active' 
                  : 'mouse-button-inactive'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full text-sm font-bold">
                <span className="mb-2 font-mono">LEFT</span>
                <Badge variant={buttonStates.left ? "default" : "secondary"} className="font-mono text-lg px-3 py-1 bg-black border-2 border-current">
                  {clickCounts.left}
                </Badge>
              </div>
            </div>

            {/* Right Button */}
            <div 
              className={`absolute top-3 right-3 w-28 h-36 rounded-tr-xl border-2 transition-all duration-150 mouse-button ${
                buttonStates.right 
                  ? 'mouse-button-active' 
                  : 'mouse-button-inactive'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full text-sm font-bold">
                <span className="mb-2 font-mono">RIGHT</span>
                <Badge variant={buttonStates.right ? "default" : "secondary"} className="font-mono text-lg px-3 py-1 bg-black border-2 border-current">
                  {clickCounts.right}
                </Badge>
              </div>
            </div>

            {/* Middle Button/Scroll Wheel */}
            <div 
              className={`absolute top-12 left-1/2 transform -translate-x-1/2 w-10 h-24 rounded-lg border-2 transition-all duration-150 mouse-button ${
                buttonStates.middle 
                  ? 'mouse-button-active' 
                  : 'mouse-button-inactive'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full text-xs font-bold">
                <span className="mb-1 text-center leading-tight font-mono">MID</span>
                <Badge variant={buttonStates.middle ? "default" : "secondary"} className="font-mono text-sm px-2 py-0.5 bg-black border border-current">
                  {clickCounts.middle}
                </Badge>
              </div>
            </div>

            {/* Back Button */}
            <div 
              className={`absolute bottom-20 left-3 w-20 h-14 rounded-lg border-2 transition-all duration-150 mouse-button ${
                buttonStates.back 
                  ? 'mouse-button-active' 
                  : 'mouse-button-inactive'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full text-xs font-bold">
                <span className="mb-1 font-mono">BACK</span>
                <Badge variant={buttonStates.back ? "default" : "secondary"} className="font-mono text-sm px-2 py-0.5 bg-black border border-current">
                  {clickCounts.back}
                </Badge>
              </div>
            </div>

            {/* Forward Button */}
            <div 
              className={`absolute bottom-20 right-3 w-20 h-14 rounded-lg border-2 transition-all duration-150 mouse-button ${
                buttonStates.forward 
                  ? 'mouse-button-active' 
                  : 'mouse-button-inactive'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full text-xs font-bold">
                <span className="mb-1 font-mono">FWD</span>
                <Badge variant={buttonStates.forward ? "default" : "secondary"} className="font-mono text-sm px-2 py-0.5 bg-black border border-current">
                  {clickCounts.forward}
                </Badge>
              </div>
            </div>

            {/* Active indicator with RGB effect */}
            {hasActiveButtons && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-rgb-red via-rgb-green to-rgb-blue rounded-full rgb-glow flex items-center justify-center border-2 border-white">
                <Zap className="w-4 h-4 text-white drop-shadow-lg" />
              </div>
            )}

            {/* Corner decorations */}
            <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-neon-green-500"></div>
            <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-neon-green-500"></div>
            <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-neon-green-500"></div>
            <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-neon-green-500"></div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <Button onClick={resetTest} variant="outline" size="lg" className="gap-2 font-semibold">
            <RotateCcw className="w-4 h-4" />
            Reset Test
          </Button>
        </div>

        {/* Total Clicks Display */}
        <div className="text-center">
          <div className="cps-counter mb-2">{totalClicks}</div>
          <p className="text-sm text-muted-foreground font-mono">TOTAL CLICKS</p>
        </div>

        {/* Instructions */}
        <div className="text-center space-y-4 p-6 glass-effect rounded-lg border border-neon-green-500/30">
          <p className="text-lg font-bold font-mono text-electric-400">{'>> MOUSE BUTTON DIAGNOSTIC PROTOCOL'}</p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="terminal-text">{'> Click any button to test'}</div>
            <div className="terminal-text">{'> Active buttons glow green'}</div>
            <div className="terminal-text">{'> Counters track clicks'}</div>
            <div className="terminal-text">{'> Tests all 5 buttons'}</div>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            COMPATIBLE: Left | Right | Middle | Back | Forward
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// Error boundary wrapper for MouseButtonTestCore
const MouseButtonTestWithErrorBoundary: React.FC<MouseButtonTestCoreProps> = (props) => (
  <ErrorBoundary>
    <MouseButtonTestCore {...props} />
  </ErrorBoundary>
)

export default MouseButtonTestWithErrorBoundary
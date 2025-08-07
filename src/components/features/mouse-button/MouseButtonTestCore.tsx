'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RotateCcw, Mouse, Zap } from 'lucide-react'
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import type { MouseButtonState, ClickCount, MouseButtonTestCoreProps } from './types'
import './styles.css'


/**
 * MouseButtonTestCore - 滑鼠按鈕測試器
 * 
 * 在測試區域內檢測滑鼠按鈕，實時反映按下/彈起狀態
 */
const MouseButtonTestCore: React.FC<MouseButtonTestCoreProps> = ({
  onStatsChange,
  onError: _onError, // eslint-disable-line @typescript-eslint/no-unused-vars
  className = ''
}) => {
  // 按鈕點擊計數
  const [clickCounts, setClickCounts] = useState<ClickCount>({
    left: 0,
    right: 0,
    middle: 0,
    back: 0,
    forward: 0
  })

  // 按鈕實時按下狀態
  const [activeButtons, setActiveButtons] = useState<MouseButtonState>({
    left: false,
    right: false,
    middle: false,
    back: false,
    forward: false
  })

  // 根據 event.button 獲取按鈕名稱
  const getButtonName = useCallback((button: number): keyof MouseButtonState => {
    switch (button) {
      case 0: return 'left'
      case 1: return 'middle'
      case 2: return 'right'
      case 3: return 'back'
      case 4: return 'forward'
      default: return 'left'
    }
  }, [])

  // 滑鼠按下事件 - 高亮按鈕 + 增加計數
  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    console.log('mousedown', event.button) // debug
    
    const buttonName = getButtonName(event.button)
    
    // 設置按鈕為激活狀態
    setActiveButtons(prev => ({ ...prev, [buttonName]: true }))
    
    // 增加點擊計數
    setClickCounts(prev => ({ ...prev, [buttonName]: prev[buttonName] + 1 }))
  }, [getButtonName])

  // 滑鼠彈起事件 - 取消高亮
  const handleMouseUp = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    console.log('mouseup', event.button) // debug
    
    const buttonName = getButtonName(event.button)
    
    // 取消按鈕激活狀態
    setActiveButtons(prev => ({ ...prev, [buttonName]: false }))
  }, [getButtonName])

  // 劫持右鍵選單
  const handleContextMenu = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    console.log('contextmenu') // debug
  }, [])

  // 劫持中鍵點擊
  const handleAuxClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    console.log('auxclick', event.button) // debug
  }, [])

  // 不需要useEffect，直接在JSX中綁定事件

  // 通知父組件狀態變化
  useEffect(() => {
    const totalClicks = Object.values(clickCounts).reduce((sum, count) => sum + count, 0)
    onStatsChange?.({
      totalClicks,
      buttonCounts: clickCounts,
      activeButtons
    })
  }, [clickCounts, activeButtons, onStatsChange])

  // 重置測試
  const resetTest = useCallback(() => {
    setClickCounts({
      left: 0,
      right: 0,
      middle: 0,
      back: 0,
      forward: 0
    })
    setActiveButtons({
      left: false,
      right: false,
      middle: false,
      back: false,
      forward: false
    })
  }, [])

  const totalClicks = Object.values(clickCounts).reduce((sum, count) => sum + count, 0)
  const hasActiveButtons = Object.values(activeButtons).some(state => state)

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
              {'>> Mouse Button Diagnostic'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Mouse Visual */}
        <div className="flex justify-center px-4">
          <div 
            className="relative bg-black border-2 border-neon-green-500/50 rounded-xl p-6 w-full max-w-sm select-none cursor-pointer"
            style={{ 
              height: '400px',
              width: '300px'
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onContextMenu={handleContextMenu}
            onAuxClick={handleAuxClick}
          >
            {/* Left Button */}
            <div 
              className={`absolute rounded-tl-xl border-2 mouse-button ${
                activeButtons.left 
                  ? 'mouse-button-active' 
                  : 'mouse-button-inactive'
              }`}
              style={{
                top: '8%',
                left: '8%',
                width: '35%',
                height: '40%',
                pointerEvents: 'none'
              }}
            >
              <div className="flex flex-col items-center justify-center h-full" style={{ pointerEvents: 'none' }}>
                <span className="mb-2 font-mono text-sm font-bold" style={{ pointerEvents: 'none' }}>LEFT</span>
                <Badge variant={activeButtons.left ? "default" : "secondary"} 
                       className="font-mono text-lg px-3 py-1 border-2 border-current"
                       style={{ pointerEvents: 'none' }}>
                  {clickCounts.left}
                </Badge>
              </div>
            </div>

            {/* Right Button */}
            <div 
              className={`absolute rounded-tr-xl border-2 mouse-button ${
                activeButtons.right 
                  ? 'mouse-button-active' 
                  : 'mouse-button-inactive'
              }`}
              style={{
                top: '8%',
                right: '8%',
                width: '35%',
                height: '40%',
                pointerEvents: 'none'
              }}
            >
              <div className="flex flex-col items-center justify-center h-full" style={{ pointerEvents: 'none' }}>
                <span className="mb-2 font-mono text-sm font-bold" style={{ pointerEvents: 'none' }}>RIGHT</span>
                <Badge variant={activeButtons.right ? "default" : "secondary"} 
                       className="font-mono text-lg px-3 py-1 border-2 border-current"
                       style={{ pointerEvents: 'none' }}>
                  {clickCounts.right}
                </Badge>
              </div>
            </div>

            {/* Middle Button */}
            <div 
              className={`absolute rounded-lg border-2 mouse-button ${
                activeButtons.middle 
                  ? 'mouse-button-active' 
                  : 'mouse-button-inactive'
              }`}
              style={{
                top: '15%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '18%',
                height: '30%',
                pointerEvents: 'none'
              }}
            >
              <div className="flex flex-col items-center justify-center h-full" style={{ pointerEvents: 'none' }}>
                <span className="mb-1 font-mono text-xs font-bold" style={{ pointerEvents: 'none' }}>MID</span>
                <Badge variant={activeButtons.middle ? "default" : "secondary"} 
                       className="font-mono text-xs px-1 py-0.5 border border-current"
                       style={{ pointerEvents: 'none' }}>
                  {clickCounts.middle}
                </Badge>
              </div>
            </div>

            {/* Back Button */}
            <div 
              className={`absolute rounded-lg border-2 mouse-button ${
                activeButtons.back 
                  ? 'mouse-button-active' 
                  : 'mouse-button-inactive'
              }`}
              style={{
                bottom: '25%',
                left: '8%',
                width: '28%',
                height: '18%',
                pointerEvents: 'none'
              }}
            >
              <div className="flex flex-col items-center justify-center h-full" style={{ pointerEvents: 'none' }}>
                <span className="mb-1 font-mono text-xs font-bold" style={{ pointerEvents: 'none' }}>BACK</span>
                <Badge variant={activeButtons.back ? "default" : "secondary"} 
                       className="font-mono text-xs px-1 py-0.5 border border-current"
                       style={{ pointerEvents: 'none' }}>
                  {clickCounts.back}
                </Badge>
              </div>
            </div>

            {/* Forward Button */}
            <div 
              className={`absolute rounded-lg border-2 mouse-button ${
                activeButtons.forward 
                  ? 'mouse-button-active' 
                  : 'mouse-button-inactive'
              }`}
              style={{
                bottom: '25%',
                right: '8%',
                width: '28%',
                height: '18%',
                pointerEvents: 'none'
              }}
            >
              <div className="flex flex-col items-center justify-center h-full" style={{ pointerEvents: 'none' }}>
                <span className="mb-1 font-mono text-xs font-bold" style={{ pointerEvents: 'none' }}>FWD</span>
                <Badge variant={activeButtons.forward ? "default" : "secondary"} 
                       className="font-mono text-xs px-1 py-0.5 border border-current"
                       style={{ pointerEvents: 'none' }}>
                  {clickCounts.forward}
                </Badge>
              </div>
            </div>

            {/* Active indicator */}
            {hasActiveButtons && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-rgb-red via-rgb-green to-rgb-blue rounded-full rgb-glow flex items-center justify-center border-2 border-white" style={{ pointerEvents: 'none' }}>
                <Zap className="w-4 h-4 text-white drop-shadow-lg" />
              </div>
            )}

            {/* Corner decorations */}
            <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-neon-green-500" style={{ pointerEvents: 'none' }}></div>
            <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-neon-green-500" style={{ pointerEvents: 'none' }}></div>
            <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-neon-green-500" style={{ pointerEvents: 'none' }}></div>
            <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-neon-green-500" style={{ pointerEvents: 'none' }}></div>
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
          <div className="cps-counter mb-2 text-3xl sm:text-4xl">{totalClicks}</div>
          <p className="text-sm text-muted-foreground font-mono">TOTAL CLICKS</p>
        </div>

        {/* Instructions */}
        <div className="text-center space-y-4 p-4 sm:p-6 glass-effect rounded-lg border border-neon-green-500/30">
          <p className="text-lg font-bold font-mono text-electric-400">{'>> MOUSE BUTTON TEST PROTOCOL'}</p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="terminal-text">{'> Click in the mouse area above'}</div>
            <div className="terminal-text">{'> Real-time button state feedback'}</div>
            <div className="terminal-text">{'> All mouse buttons supported'}</div>
            <div className="terminal-text">{'> Click counters track usage'}</div>
          </div>
          <div className="text-xs text-muted-foreground font-mono space-y-2">
            <p className="text-neon-green-400">✓ PRESS: Button lights up immediately</p>
            <p className="text-electric-400">✓ RELEASE: Button turns off immediately</p>
            <p className="text-cyber-pink-400">✓ SUPPORTS: Left | Right | Middle | Back | Forward</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Error boundary wrapper
const MouseButtonTestWithErrorBoundary: React.FC<MouseButtonTestCoreProps> = (props) => (
  <ErrorBoundary>
    <MouseButtonTestCore {...props} />
  </ErrorBoundary>
)

export default MouseButtonTestWithErrorBoundary
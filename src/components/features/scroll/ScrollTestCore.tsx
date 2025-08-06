'use client'

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { RotateCcw, Play, Mouse, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import type { ScrollTestResult } from '@/types'

interface ScrollTestCoreProps {
  duration?: number
  title?: string
  description?: string
  onResultChange?: (result: ScrollTestResult | null) => void
  onStatusChange?: (status: TestState) => void
  onStatsChange?: (stats: TestStats) => void
  onError?: (error: string | null) => void
}

type TestState = 'idle' | 'ready' | 'running' | 'finished'

interface TestStats {
  totalScrolls: number
  upScrolls: number
  downScrolls: number
  leftScrolls: number
  rightScrolls: number
  middleClicks: number
  timeLeft: number
}

/**
 * ScrollTestCore Component
 * 
 * 純滾輪測試邏輯組件，不包含佈局。專注於滾輪檢測功能。
 * 測試垂直滾動、水平滾動、中鍵點擊功能。
 * 
 * @component
 * @example
 * ```tsx
 * <ScrollTestCore
 *   duration={30}
 *   title="SCROLL TEST"
 *   onResultChange={handleResult}
 *   onStatsChange={handleStats}
 *   onError={handleError}
 * />
 * ```
 * 
 * @param duration - 測試持續時間（秒），預設30秒
 * @param title - 測試標題
 * @param description - 測試描述
 * @param onResultChange - 測試結果變化回調
 * @param onStatusChange - 測試狀態變化回調
 * @param onStatsChange - 統計數據變化回調
 * @param onError - 錯誤處理回調
 * 
 * @returns {JSX.Element} 純滾輪測試組件
 * 
 * @features
 * - 純測試邏輯，無佈局干擾
 * - 垂直滾動檢測（上下滾動）
 * - 水平滾動檢測（左右滾動）
 * - 中鍵點擊檢測
 * - 實時統計和視覺反饋
 * - localStorage數據持久化
 * - 滾動方向動畫效果
 * 
 * @design
 * - 專注於核心測試功能
 * - 通過props回調與外部通信
 * - 保持cyberpunk/gaming視覺風格
 * - 直觀的滾輪視覺化設計
 * - 方向指示器和計數器
 */
const ScrollTestCore: React.FC<ScrollTestCoreProps> = ({ 
  duration = 30,
  title,
  description,
  onResultChange,
  onStatusChange,
  onStatsChange,
  onError
}) => {
  const [testState, setTestState] = useState<TestState>('idle')
  const [timeLeft, setTimeLeft] = useState(duration)
  const [totalScrolls, setTotalScrolls] = useState(0)
  const [upScrolls, setUpScrolls] = useState(0)
  const [downScrolls, setDownScrolls] = useState(0)
  const [leftScrolls, setLeftScrolls] = useState(0)
  const [rightScrolls, setRightScrolls] = useState(0)
  const [middleClicks, setMiddleClicks] = useState(0)
  const [lastScrollDirection, setLastScrollDirection] = useState<string | null>(null)
  const [bestScore, setBestScore] = useState<number>(0)
  const [isCountdown, setIsCountdown] = useState(false)
  const [countdownValue, setCountdownValue] = useState(3)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Safe localStorage access
  const safeLocalStorage = useMemo(() => ({
    getItem: (key: string): string | null => {
      try {
        return localStorage.getItem(key)
      } catch (error) {
        console.warn('localStorage not available:', error)
        return null
      }
    },
    setItem: (key: string, value: string): void => {
      try {
        localStorage.setItem(key, value)
      } catch (error) {
        console.warn('localStorage not available:', error)
      }
    }
  }), [])

  // Load best score from localStorage
  useEffect(() => {
    try {
      const savedScore = safeLocalStorage.getItem('scroll-test-best-score')
      if (savedScore) {
        setBestScore(parseFloat(savedScore))
      }
    } catch (error) {
      console.warn('Failed to load best score:', error)
      onError?.('Failed to load previous scores')
    }
  }, [safeLocalStorage, onError])

  // Notify parent of state changes
  useEffect(() => {
    onStatusChange?.(testState)
  }, [testState, onStatusChange])

  // Notify parent of stats changes
  useEffect(() => {
    onStatsChange?.({
      totalScrolls,
      upScrolls,
      downScrolls,
      leftScrolls,
      rightScrolls,
      middleClicks,
      timeLeft
    })
  }, [totalScrolls, upScrolls, downScrolls, leftScrolls, rightScrolls, middleClicks, timeLeft, onStatsChange])

  const resetTest = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (countdownRef.current) clearInterval(countdownRef.current)
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    
    setTestState('idle')
    setTimeLeft(duration)
    setTotalScrolls(0)
    setUpScrolls(0)
    setDownScrolls(0)
    setLeftScrolls(0)
    setRightScrolls(0)
    setMiddleClicks(0)
    setLastScrollDirection(null)
    setIsCountdown(false)
    setCountdownValue(3)
    onResultChange?.(null)
  }, [duration, onResultChange])

  const startCountdown = useCallback(() => {
    setIsCountdown(true)
    setCountdownValue(3)
    
    countdownRef.current = setInterval(() => {
      setCountdownValue(prev => {
        if (prev <= 1) {
          setIsCountdown(false)
          setTestState('running')
          
          // Start the main timer
          intervalRef.current = setInterval(() => {
            setTimeLeft(prevTime => {
              if (prevTime <= 0.1) {
                setTestState('finished')
                if (intervalRef.current) clearInterval(intervalRef.current)
                return 0
              }
              return prevTime - 0.1
            })
          }, 100)
          
          if (countdownRef.current) clearInterval(countdownRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  const handleWheel = useCallback((event: React.WheelEvent) => {
    event.preventDefault()
    
    if (testState !== 'running') return

    const deltaY = event.deltaY
    const deltaX = event.deltaX
    
    setTotalScrolls(prev => prev + 1)
    
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      // Vertical scroll
      if (deltaY < 0) {
        // Scroll up
        setUpScrolls(prev => prev + 1)
        setLastScrollDirection('up')
      } else {
        // Scroll down
        setDownScrolls(prev => prev + 1)
        setLastScrollDirection('down')
      }
    } else {
      // Horizontal scroll
      if (deltaX < 0) {
        // Scroll left
        setLeftScrolls(prev => prev + 1)
        setLastScrollDirection('left')
      } else {
        // Scroll right
        setRightScrolls(prev => prev + 1)
        setLastScrollDirection('right')
      }
    }

    // Clear previous timeout and set new one to reset direction indicator
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    scrollTimeoutRef.current = setTimeout(() => {
      setLastScrollDirection(null)
    }, 1000)
  }, [testState])

  const handleMiddleClick = useCallback((event: React.MouseEvent) => {
    if (event.button === 1) {
      event.preventDefault()
      
      if (testState === 'idle') {
        setTestState('ready')
        startCountdown()
        return
      }
      
      if (testState !== 'running') return
      
      setMiddleClicks(prev => prev + 1)
    }
  }, [testState, startCountdown])

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    
    if (testState === 'idle' && event.button === 0) {
      setTestState('ready')
      startCountdown()
      return
    }
  }, [testState, startCountdown])

  // Calculate final results
  useEffect(() => {
    if (testState === 'finished') {
      try {
        const finalScore = totalScrolls + middleClicks
        
        // Save best score
        if (finalScore > bestScore) {
          setBestScore(finalScore)
          safeLocalStorage.setItem('scroll-test-best-score', finalScore.toString())
        }
        
        // Create and save test result
        const result: ScrollTestResult = {
          totalScrolls,
          upScrolls,
          downScrolls,
          leftScrolls,
          rightScrolls,
          middleClicks,
          timestamp: new Date()
        }
        
        onResultChange?.(result)
        
        const existingResultsStr = safeLocalStorage.getItem('scroll-test-history') || '[]'
        const existingResults = JSON.parse(existingResultsStr)
        existingResults.push(result)
        safeLocalStorage.setItem('scroll-test-history', JSON.stringify(existingResults.slice(-50)))
      } catch (error) {
        console.warn('Failed to save test results:', error)
        onError?.('Failed to save results')
      }
    }
  }, [testState, totalScrolls, upScrolls, downScrolls, leftScrolls, rightScrolls, middleClicks, bestScore, safeLocalStorage, onResultChange, onError])

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <ArrowUp className="w-8 h-8 text-neon-green-400" />
      case 'down': return <ArrowDown className="w-8 h-8 text-cyber-pink-400" />
      case 'left': return <ArrowLeft className="w-8 h-8 text-electric-400" />
      case 'right': return <ArrowRight className="w-8 h-8 text-warning-orange-400" />
      default: return null
    }
  }

  return (
    <Card className="test-card">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-warning-orange-500 to-neon-green-500 flex items-center justify-center shadow-lg shadow-warning-orange-500/30">
            <Mouse className="w-6 h-6 text-black" />
          </div>
          <div>
            <CardTitle className="text-3xl font-black hero-gradient">
              {title || "SCROLL WHEEL TEST"}
            </CardTitle>
            <CardDescription className="text-lg mt-1 font-mono text-electric-600 dark:text-electric-400">
              {description || `>> ${duration} Second Scroll Wheel Diagnostic`}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Scroll Area */}
        <div className="flex justify-center">
          <div 
            className={`scroll-area ${testState === 'running' ? 'active' : ''} ${isCountdown ? 'countdown' : ''}`}
            onWheel={handleWheel}
            onMouseDown={handleClick}
            onMouseUp={handleMiddleClick}
            onContextMenu={(e) => e.preventDefault()}
            style={{
              width: '400px',
              height: '300px',
              background: testState === 'running' ? 'linear-gradient(45deg, #000000, #2a1a00)' : '#000000',
              border: `3px solid ${testState === 'running' ? '#ff6600' : '#333333'}`,
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.3s ease',
              boxShadow: testState === 'running' ? '0 0 30px rgba(255, 102, 0, 0.5)' : 'none',
              position: 'relative',
            }}
          >
            {isCountdown ? (
              <div className="text-center">
                <div className="text-8xl font-black text-warning-orange-500 mb-4 animate-pulse">
                  {countdownValue}
                </div>
                <p className="text-xl font-mono text-electric-400">PREPARE TO SCROLL...</p>
              </div>
            ) : testState === 'idle' ? (
              <div className="text-center space-y-4">
                <div className="text-6xl">🖱️</div>
                <div className="space-y-2">
                  <p className="text-2xl font-black text-warning-orange-400">CLICK TO START</p>
                  <p className="text-lg font-mono text-electric-400">Test your scroll wheel and middle click!</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    Duration: {duration} seconds
                  </p>
                </div>
              </div>
            ) : testState === 'running' ? (
              <div className="text-center space-y-4">
                {/* Direction Indicator */}
                <div className="flex items-center justify-center h-16 mb-4">
                  {lastScrollDirection && (
                    <div className="animate-pulse">
                      {getDirectionIcon(lastScrollDirection)}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="text-6xl font-black text-warning-orange-400 cps-counter">
                    {totalScrolls}
                  </div>
                  <p className="text-xl font-mono text-electric-400">SCROLLS</p>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-neon-green-400">
                    {timeLeft.toFixed(1)}s
                  </div>
                  <div className="text-lg font-mono text-cyber-pink-400">
                    Middle: {middleClicks}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-4xl font-black text-warning-orange-400">TEST COMPLETE!</div>
                <div className="space-y-2">
                  <div className="text-6xl font-black text-neon-green-400 cps-counter">
                    {totalScrolls}
                  </div>
                  <p className="text-xl font-mono text-electric-400">TOTAL SCROLLS</p>
                </div>
                <div className="space-y-1 text-sm font-mono text-muted-foreground">
                  <div>Middle clicks: {middleClicks}</div>
                </div>
              </div>
            )}
            
            {/* Corner decorations */}
            <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-warning-orange-500"></div>
            <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-warning-orange-500"></div>
            <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-warning-orange-500"></div>
            <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-warning-orange-500"></div>
          </div>
        </div>

        {/* Stats Display */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-4 glass-effect rounded-lg border border-neon-green-500/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ArrowUp className="w-4 h-4 text-neon-green-400" />
              <Badge variant="secondary" className="font-mono">{upScrolls}</Badge>
            </div>
            <div className="text-xs font-mono text-muted-foreground">UP</div>
          </div>
          <div className="text-center p-4 glass-effect rounded-lg border border-cyber-pink-500/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ArrowDown className="w-4 h-4 text-cyber-pink-400" />
              <Badge variant="secondary" className="font-mono">{downScrolls}</Badge>
            </div>
            <div className="text-xs font-mono text-muted-foreground">DOWN</div>
          </div>
          <div className="text-center p-4 glass-effect rounded-lg border border-electric-500/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ArrowLeft className="w-4 h-4 text-electric-400" />
              <Badge variant="secondary" className="font-mono">{leftScrolls}</Badge>
            </div>
            <div className="text-xs font-mono text-muted-foreground">LEFT</div>
          </div>
          <div className="text-center p-4 glass-effect rounded-lg border border-warning-orange-500/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ArrowRight className="w-4 h-4 text-warning-orange-400" />
              <Badge variant="secondary" className="font-mono">{rightScrolls}</Badge>
            </div>
            <div className="text-xs font-mono text-muted-foreground">RIGHT</div>
          </div>
          <div className="text-center p-4 glass-effect rounded-lg border border-hacker-purple-500/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mouse className="w-4 h-4 text-hacker-purple-400" />
              <Badge variant="secondary" className="font-mono">{middleClicks}</Badge>
            </div>
            <div className="text-xs font-mono text-muted-foreground">MIDDLE</div>
          </div>
          <div className="text-center p-4 glass-effect rounded-lg border border-warning-orange-500/30">
            <div className="text-2xl font-black text-warning-orange-400">{totalScrolls}</div>
            <div className="text-xs font-mono text-muted-foreground">TOTAL</div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          <Button 
            onClick={resetTest} 
            variant="outline" 
            size="lg" 
            className="gap-2 font-semibold"
            disabled={testState === 'running' || isCountdown}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          {testState === 'finished' && (
            <Button 
              onClick={() => {
                resetTest()
                setTimeout(() => {
                  setTestState('ready')
                  startCountdown()
                }, 100)
              }}
              className="bg-gradient-to-r from-warning-orange-600 to-neon-green-600 border-2 border-warning-orange-400 text-white hover:from-warning-orange-500 hover:to-neon-green-500 hover:shadow-lg hover:shadow-warning-orange-500/50 active:scale-95 transition-all duration-150 gap-2"
              size="lg"
            >
              <Play className="w-4 h-4" />
              Test Again
            </Button>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center space-y-4 p-6 glass-effect rounded-lg border border-warning-orange-500/30">
          <p className="text-lg font-bold font-mono text-electric-400">
            {'>> SCROLL WHEEL DIAGNOSTIC PROTOCOL'}
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="terminal-text">{'> Scroll wheel in all directions'}</div>
            <div className="terminal-text">{'> Click middle button to test'}</div>
            <div className="terminal-text">{'> Tests vertical & horizontal scrolling'}</div>
            <div className="terminal-text">{'> Results saved automatically'}</div>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            SUPPORTED: ↑ Up | ↓ Down | ← Left | → Right | Middle Click
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Error boundary wrapper for ScrollTestCore
const ScrollTestWithErrorBoundary: React.FC<ScrollTestCoreProps> = (props) => (
  <ErrorBoundary>
    <ScrollTestCore {...props} />
  </ErrorBoundary>
)

export default ScrollTestWithErrorBoundary
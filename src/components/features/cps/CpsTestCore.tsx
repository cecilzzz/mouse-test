'use client'

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { RotateCcw, Timer, Play } from 'lucide-react'
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import type { CpsTestResult } from './types'
import './styles.css'

interface CpsTestCoreProps {
  duration: number
  testType?: 'left' | 'right' | 'spacebar' | 'mobile'
  title?: string
  description?: string
  onResultChange?: (result: CpsTestResult | null) => void
  onStatusChange?: (status: TestState) => void
  onStatsChange?: (stats: TestStats) => void
  onError?: (error: string | null) => void
}

type TestState = 'idle' | 'ready' | 'running' | 'finished'

interface TestStats {
  clickCount: number
  timeLeft: number
  cps: number
  bestScore: number
}

/**
 * CpsTestCore Component
 * 
 * 純CPS測試邏輯組件，不包含佈局。專注於測試功能實現。
 * 通過回調函數與外部組件通信，支持各種測試類型。
 * 
 * @component
 * @example
 * ```tsx
 * <CpsTestCore
 *   duration={5}
 *   testType="left"
 *   title="5 SECOND CPS TEST"
 *   onResultChange={handleResult}
 *   onStatsChange={handleStats}
 *   onError={handleError}
 * />
 * ```
 * 
 * @param duration - 測試持續時間（秒）
 * @param testType - 測試類型：left/right/spacebar/mobile
 * @param title - 測試標題
 * @param description - 測試描述
 * @param onResultChange - 測試結果變化回調
 * @param onStatusChange - 測試狀態變化回調
 * @param onStatsChange - 統計數據變化回調
 * @param onError - 錯誤處理回調
 * 
 * @returns {JSX.Element} 純測試組件（不含sidebar和layout）
 * 
 * @features 
 * - 純測試邏輯，無佈局干擾
 * - 支持多種測試類型（鼠標左鍵、右鍵、空格鍵、移動端觸摸）
 * - 實時統計和最佳成績記錄
 * - localStorage數據持久化
 * - 精確的100ms計時間隔
 * - 3秒倒計時預備階段
 * 
 * @design
 * - 專注於核心測試功能
 * - 通過props回調與外部通信
 * - 保持cyberpunk/gaming視覺風格
 * - 大按鈕設計適合快速點擊
 */
const CpsTestCore: React.FC<CpsTestCoreProps> = ({ 
  duration, 
  testType = 'left',
  title,
  description,
  onResultChange,
  onStatusChange,
  onStatsChange,
  onError
}) => {
  const [testState, setTestState] = useState<TestState>('idle')
  const [clickCount, setClickCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(duration)
  const [cps, setCps] = useState(0)
  const [bestScore, setBestScore] = useState<number>(0)
  const [isCountdown, setIsCountdown] = useState(false)
  const [countdownValue, setCountdownValue] = useState(3)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)
  const testStartTimeRef = useRef<number>(0)
  const clickTimestampsRef = useRef<number[]>([])

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
      const savedScore = safeLocalStorage.getItem(`cps-best-${duration}s-${testType}`)
      if (savedScore) {
        setBestScore(parseFloat(savedScore))
      }
    } catch (error) {
      console.warn('Failed to load best score:', error)
      onError?.('Failed to load previous scores')
    }
  }, [duration, testType, safeLocalStorage, onError])

  // Notify parent of state changes
  useEffect(() => {
    onStatusChange?.(testState)
  }, [testState, onStatusChange])

  // Notify parent of stats changes
  useEffect(() => {
    onStatsChange?.({
      clickCount,
      timeLeft,
      cps,
      bestScore
    })
  }, [clickCount, timeLeft, cps, bestScore, onStatsChange])

  const resetTest = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (countdownRef.current) clearInterval(countdownRef.current)
    
    setTestState('idle')
    setClickCount(0)
    setTimeLeft(duration)
    setCps(0)
    setIsCountdown(false)
    setCountdownValue(3)
    clickTimestampsRef.current = []
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
          testStartTimeRef.current = Date.now()
          
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

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    
    if (testState === 'idle') {
      setTestState('ready')
      startCountdown()
      return
    }
    
    if (testState !== 'running') return

    const now = Date.now()
    clickTimestampsRef.current.push(now)
    
    setClickCount(prev => {
      const newCount = prev + 1
      const elapsed = (now - testStartTimeRef.current) / 1000
      const currentCps = elapsed > 0 ? newCount / elapsed : 0
      setCps(currentCps)
      return newCount
    })
  }, [testState, startCountdown])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (testType === 'spacebar' && event.code === 'Space') {
      event.preventDefault()
      const mockEvent = { preventDefault: () => {} } as React.MouseEvent
      handleClick(mockEvent)
    }
  }, [testType, handleClick])

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    if (testType === 'right') {
      event.preventDefault()
      handleClick(event)
    }
  }, [testType, handleClick])

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    if (testType === 'mobile') {
      event.preventDefault()
      const mockEvent = { preventDefault: () => {} } as React.MouseEvent
      handleClick(mockEvent)
    }
  }, [testType, handleClick])

  // Handle spacebar events
  useEffect(() => {
    if (testType === 'spacebar') {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [testType, handleKeyDown])

  // Calculate final results
  useEffect(() => {
    if (testState === 'finished') {
      try {
        const finalCps = clickCount / duration
        setCps(finalCps)
        
        // Save best score
        if (finalCps > bestScore) {
          setBestScore(finalCps)
          safeLocalStorage.setItem(`cps-best-${duration}s-${testType}`, finalCps.toString())
        }
        
        // Create and save test result
        const result: CpsTestResult = {
          clicksPerSecond: finalCps,
          totalClicks: clickCount,
          testDuration: duration,
          timestamp: new Date()
        }
        
        onResultChange?.(result)
        
        const existingResultsStr = safeLocalStorage.getItem('cps-test-history') || '[]'
        const existingResults = JSON.parse(existingResultsStr)
        existingResults.push(result)
        safeLocalStorage.setItem('cps-test-history', JSON.stringify(existingResults.slice(-50)))
      } catch (error) {
        console.warn('Failed to save test results:', error)
        onError?.('Failed to save results')
      }
    }
  }, [testState, clickCount, duration, bestScore, testType, safeLocalStorage, onResultChange, onError])

  const getClickAreaProps = () => {
    const baseProps = {
      className: `click-area ${testState === 'running' ? 'active' : ''} ${isCountdown ? 'countdown' : ''}`,
      onMouseDown: testType === 'left' ? handleClick : undefined,
      onContextMenu: testType === 'right' ? handleContextMenu : undefined,
      onTouchStart: testType === 'mobile' ? handleTouchStart : undefined,
    }
    
    return baseProps
  }

  const getInstructions = () => {
    switch (testType) {
      case 'right':
        return 'Right-click as fast as you can!'
      case 'spacebar':
        return 'Press spacebar as fast as you can!'
      case 'mobile':
        return 'Tap the screen as fast as you can!'
      default:
        return 'Click as fast as you can!'
    }
  }

  const getIcon = () => {
    switch (testType) {
      case 'spacebar':
        return '⌨️'
      case 'mobile':
        return '📱'
      default:
        return '🖱️'
    }
  }

  return (
    <Card className="test-card">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-green-500 to-electric-500 flex items-center justify-center shadow-lg shadow-neon-green-500/30">
            <Timer className="w-6 h-6 text-black" />
          </div>
          <div>
            <CardTitle className="text-3xl font-black hero-gradient">
              {title || `${duration}S CPS TEST`}
            </CardTitle>
            <CardDescription className="text-lg mt-1 font-mono text-electric-600 dark:text-electric-400">
              {description || `>> ${duration} Second Click Speed Test`}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Click Area */}
        <div className="flex justify-center">
          <div 
            {...getClickAreaProps()}
            style={{
              width: '400px',
              height: '300px',
              background: testState === 'running' ? 'linear-gradient(45deg, #000000, #001100)' : '#000000',
              border: `3px solid ${testState === 'running' ? '#00ff41' : '#333333'}`,
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.3s ease',
              boxShadow: testState === 'running' ? '0 0 30px rgba(0, 255, 65, 0.5)' : 'none',
              position: 'relative',
            }}
          >
            {isCountdown ? (
              <div className="text-center">
                <div className="text-8xl font-black text-warning-orange-500 mb-4 animate-pulse">
                  {countdownValue}
                </div>
                <p className="text-xl font-mono text-electric-400">GET READY...</p>
              </div>
            ) : testState === 'idle' ? (
              <div className="text-center space-y-4">
                <div className="text-6xl">{getIcon()}</div>
                <div className="space-y-2">
                  <p className="text-2xl font-black text-neon-green-400">CLICK TO START</p>
                  <p className="text-lg font-mono text-electric-400">{getInstructions()}</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    Duration: {duration} seconds
                  </p>
                </div>
              </div>
            ) : testState === 'running' ? (
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <div className="text-6xl font-black text-neon-green-400 cps-counter">
                    {clickCount}
                  </div>
                  <p className="text-xl font-mono text-electric-400">CLICKS</p>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-black text-cyber-pink-400">
                    {timeLeft.toFixed(1)}s
                  </div>
                  <div className="text-lg font-mono text-warning-orange-400">
                    CPS: {cps.toFixed(2)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-4xl font-black text-neon-green-400">TEST COMPLETE!</div>
                <div className="space-y-2">
                  <div className="text-6xl font-black text-cyber-pink-400 cps-counter">
                    {cps.toFixed(2)}
                  </div>
                  <p className="text-xl font-mono text-electric-400">CPS</p>
                </div>
                <div className="text-lg font-mono text-muted-foreground">
                  {clickCount} clicks in {duration} seconds
                </div>
              </div>
            )}
            
            {/* Corner decorations */}
            <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-neon-green-500"></div>
            <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-neon-green-500"></div>
            <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-neon-green-500"></div>
            <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-neon-green-500"></div>
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
              className="bg-gradient-to-r from-electric-600 to-cyber-pink-600 border-2 border-electric-400 text-white hover:from-electric-500 hover:to-cyber-pink-500 hover:shadow-lg hover:shadow-electric-500/50 active:scale-95 transition-all duration-150 gap-2"
              size="lg"
            >
              <Play className="w-4 h-4" />
              Test Again
            </Button>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center space-y-4 p-6 glass-effect rounded-lg border border-neon-green-500/30">
          <p className="text-lg font-bold font-mono text-electric-400">
            {'>> '}{duration}S CPS DIAGNOSTIC PROTOCOL
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="terminal-text">{'> '}{getInstructions()}</div>
            <div className="terminal-text">{'> '}Test duration: {duration} seconds</div>
            <div className="terminal-text">{'> '}Count every click/tap</div>
            <div className="terminal-text">{'> '}Results saved automatically</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Error boundary wrapper for CpsTestCore
const CpsTestWithErrorBoundary: React.FC<CpsTestCoreProps> = (props) => (
  <ErrorBoundary>
    <CpsTestCore {...props} />
  </ErrorBoundary>
)

export default CpsTestWithErrorBoundary
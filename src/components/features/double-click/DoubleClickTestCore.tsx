'use client'

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { RotateCcw, Play, MousePointer2 } from 'lucide-react'
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import type { DoubleClickTestResult } from '@/types'

interface DoubleClickTestCoreProps {
  duration?: number
  title?: string
  description?: string
  onResultChange?: (result: DoubleClickTestResult | null) => void
  onStatusChange?: (status: TestState) => void
  onStatsChange?: (stats: TestStats) => void
  onError?: (error: string | null) => void
}

type TestState = 'idle' | 'ready' | 'running' | 'finished'

interface TestStats {
  totalDoubleClicks: number
  failedDoubleClicks: number
  averageInterval: number
  consistency: number
  timeLeft: number
}

interface ClickEvent {
  timestamp: number
  x: number
  y: number
}

/**
 * DoubleClickTestCore Component
 * 
 * 純雙擊測試邏輯組件，不包含佈局。專注於雙擊檢測功能。
 * 測量雙擊間隔、一致性、準確度等指標。
 * 
 * @component
 * @example
 * ```tsx
 * <DoubleClickTestCore
 *   duration={30}
 *   title="DOUBLE CLICK TEST"
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
 * @returns {JSX.Element} 純雙擊測試組件
 * 
 * @features
 * - 純測試邏輯，無佈局干擾
 * - 精確雙擊間隔測量（毫秒級）
 * - 雙擊失敗檢測（間隔過長）
 * - 一致性評分算法
 * - 實時統計和最佳成績記錄
 * - localStorage數據持久化
 * - 視覺反饋和動畫效果
 * 
 * @design
 * - 專注於核心測試功能
 * - 通過props回調與外部通信
 * - 保持cyberpunk/gaming視覺風格
 * - 大點擊區域適合雙擊測試
 * - 實時間隔顯示
 */
const DoubleClickTestCore: React.FC<DoubleClickTestCoreProps> = ({ 
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
  const [totalDoubleClicks, setTotalDoubleClicks] = useState(0)
  const [failedDoubleClicks, setFailedDoubleClicks] = useState(0)
  const [averageInterval, setAverageInterval] = useState(0)
  const [consistency, setConsistency] = useState(100)
  const [lastClickTime, setLastClickTime] = useState<number>(0)
  const [currentInterval, setCurrentInterval] = useState<number | null>(null)
  const [bestScore, setBestScore] = useState<number>(0)
  const [isCountdown, setIsCountdown] = useState(false)
  const [countdownValue, setCountdownValue] = useState(3)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)
  const clickEventsRef = useRef<ClickEvent[]>([])
  const intervalsRef = useRef<number[]>([])

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
      const savedScore = safeLocalStorage.getItem('double-click-best-score')
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
      totalDoubleClicks,
      failedDoubleClicks,
      averageInterval,
      consistency,
      timeLeft
    })
  }, [totalDoubleClicks, failedDoubleClicks, averageInterval, consistency, timeLeft, onStatsChange])

  const resetTest = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (countdownRef.current) clearInterval(countdownRef.current)
    
    setTestState('idle')
    setTimeLeft(duration)
    setTotalDoubleClicks(0)
    setFailedDoubleClicks(0)
    setAverageInterval(0)
    setConsistency(100)
    setLastClickTime(0)
    setCurrentInterval(null)
    setIsCountdown(false)
    setCountdownValue(3)
    clickEventsRef.current = []
    intervalsRef.current = []
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

  const calculateStats = useCallback((intervals: number[]) => {
    if (intervals.length === 0) return { avg: 0, consistency: 100 }
    
    const avg = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length
    const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - avg, 2), 0) / intervals.length
    const stdDev = Math.sqrt(variance)
    const consistency = Math.max(0, 100 - (stdDev / avg) * 100)
    
    return { avg, consistency }
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
    const clickEvent: ClickEvent = {
      timestamp: now,
      x: event.clientX,
      y: event.clientY
    }
    
    clickEventsRef.current.push(clickEvent)
    
    if (lastClickTime > 0) {
      const interval = now - lastClickTime
      setCurrentInterval(interval)
      
      // Check if it's a valid double-click (within 500ms)
      if (interval <= 500) {
        intervalsRef.current.push(interval)
        setTotalDoubleClicks(prev => prev + 1)
        
        // Calculate new stats
        const { avg, consistency: newConsistency } = calculateStats(intervalsRef.current)
        setAverageInterval(avg)
        setConsistency(newConsistency)
      } else {
        setFailedDoubleClicks(prev => prev + 1)
      }
    }
    
    setLastClickTime(now)
  }, [testState, startCountdown, lastClickTime, calculateStats])

  // Calculate final results
  useEffect(() => {
    if (testState === 'finished') {
      try {
        const { avg, consistency: finalConsistency } = calculateStats(intervalsRef.current)
        const finalScore = totalDoubleClicks > 0 ? (totalDoubleClicks * finalConsistency) / 100 : 0
        
        // Save best score
        if (finalScore > bestScore) {
          setBestScore(finalScore)
          safeLocalStorage.setItem('double-click-best-score', finalScore.toString())
        }
        
        // Create and save test result
        const result: DoubleClickTestResult = {
          averageInterval: avg,
          minInterval: intervalsRef.current.length > 0 ? Math.min(...intervalsRef.current) : 0,
          maxInterval: intervalsRef.current.length > 0 ? Math.max(...intervalsRef.current) : 0,
          totalDoubleClicks,
          failedDoubleClicks,
          consistency: finalConsistency,
          timestamp: new Date()
        }
        
        onResultChange?.(result)
        
        const existingResultsStr = safeLocalStorage.getItem('double-click-test-history') || '[]'
        const existingResults = JSON.parse(existingResultsStr)
        existingResults.push(result)
        safeLocalStorage.setItem('double-click-test-history', JSON.stringify(existingResults.slice(-50)))
      } catch (error) {
        console.warn('Failed to save test results:', error)
        onError?.('Failed to save results')
      }
    }
  }, [testState, totalDoubleClicks, failedDoubleClicks, consistency, bestScore, safeLocalStorage, onResultChange, onError, calculateStats])

  const successRate = totalDoubleClicks + failedDoubleClicks > 0 
    ? (totalDoubleClicks / (totalDoubleClicks + failedDoubleClicks)) * 100 
    : 0

  return (
    <Card className="test-card">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyber-pink-500 to-warning-orange-500 flex items-center justify-center shadow-lg shadow-cyber-pink-500/30">
            <MousePointer2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-black hero-gradient">
              {title || "DOUBLE CLICK TEST"}
            </CardTitle>
            <CardDescription className="text-lg mt-1 font-mono text-electric-600 dark:text-electric-400">
              {description || `>> ${duration} Second Double-Click Diagnostic`}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Click Area */}
        <div className="flex justify-center">
          <div 
            className={`click-area ${testState === 'running' ? 'active' : ''} ${isCountdown ? 'countdown' : ''}`}
            onClick={handleClick}
            style={{
              width: '400px',
              height: '300px',
              background: testState === 'running' ? 'linear-gradient(45deg, #000000, #2a0a2a)' : '#000000',
              border: `3px solid ${testState === 'running' ? '#ff0080' : '#333333'}`,
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.3s ease',
              boxShadow: testState === 'running' ? '0 0 30px rgba(255, 0, 128, 0.5)' : 'none',
              position: 'relative',
            }}
          >
            {isCountdown ? (
              <div className="text-center">
                <div className="text-8xl font-black text-warning-orange-500 mb-4 animate-pulse">
                  {countdownValue}
                </div>
                <p className="text-xl font-mono text-electric-400">PREPARE TO DOUBLE-CLICK...</p>
              </div>
            ) : testState === 'idle' ? (
              <div className="text-center space-y-4">
                <div className="text-6xl">🖱️</div>
                <div className="space-y-2">
                  <p className="text-2xl font-black text-cyber-pink-400">CLICK TO START</p>
                  <p className="text-lg font-mono text-electric-400">Double-click as consistently as possible!</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    Duration: {duration} seconds
                  </p>
                </div>
              </div>
            ) : testState === 'running' ? (
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <div className="text-6xl font-black text-cyber-pink-400 cps-counter">
                    {totalDoubleClicks}
                  </div>
                  <p className="text-xl font-mono text-electric-400">DOUBLE CLICKS</p>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-neon-green-400">
                    {timeLeft.toFixed(1)}s
                  </div>
                  {currentInterval && (
                    <div className="text-lg font-mono text-warning-orange-400">
                      Last: {currentInterval}ms
                    </div>
                  )}
                  <div className="text-sm font-mono text-electric-400">
                    Failed: {failedDoubleClicks}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-4xl font-black text-cyber-pink-400">TEST COMPLETE!</div>
                <div className="space-y-2">
                  <div className="text-6xl font-black text-neon-green-400 cps-counter">
                    {totalDoubleClicks}
                  </div>
                  <p className="text-xl font-mono text-electric-400">SUCCESSFUL</p>
                </div>
                <div className="space-y-1 text-sm font-mono text-muted-foreground">
                  <div>Avg: {averageInterval.toFixed(0)}ms</div>
                  <div>Success: {successRate.toFixed(1)}%</div>
                  <div>Consistency: {consistency.toFixed(1)}%</div>
                </div>
              </div>
            )}
            
            {/* Corner decorations */}
            <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-cyber-pink-500"></div>
            <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-cyber-pink-500"></div>
            <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-cyber-pink-500"></div>
            <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-cyber-pink-500"></div>
          </div>
        </div>

        {/* Stats Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 glass-effect rounded-lg border border-cyber-pink-500/30">
            <div className="text-2xl font-black text-cyber-pink-400">{totalDoubleClicks}</div>
            <div className="text-xs font-mono text-muted-foreground">SUCCESSFUL</div>
          </div>
          <div className="text-center p-4 glass-effect rounded-lg border border-warning-orange-500/30">
            <div className="text-2xl font-black text-warning-orange-400">{failedDoubleClicks}</div>
            <div className="text-xs font-mono text-muted-foreground">FAILED</div>
          </div>
          <div className="text-center p-4 glass-effect rounded-lg border border-neon-green-500/30">
            <div className="text-2xl font-black text-neon-green-400">{averageInterval.toFixed(0)}</div>
            <div className="text-xs font-mono text-muted-foreground">AVG MS</div>
          </div>
          <div className="text-center p-4 glass-effect rounded-lg border border-electric-500/30">
            <div className="text-2xl font-black text-electric-400">{consistency.toFixed(1)}%</div>
            <div className="text-xs font-mono text-muted-foreground">CONSISTENT</div>
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
              className="bg-gradient-to-r from-cyber-pink-600 to-warning-orange-600 border-2 border-cyber-pink-400 text-white hover:from-cyber-pink-500 hover:to-warning-orange-500 hover:shadow-lg hover:shadow-cyber-pink-500/50 active:scale-95 transition-all duration-150 gap-2"
              size="lg"
            >
              <Play className="w-4 h-4" />
              Test Again
            </Button>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center space-y-4 p-6 glass-effect rounded-lg border border-cyber-pink-500/30">
          <p className="text-lg font-bold font-mono text-electric-400">
            {'>> DOUBLE-CLICK DIAGNOSTIC PROTOCOL'}
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="terminal-text">{'> Double-click as fast as possible'}</div>
            <div className="terminal-text">{'> Valid double-clicks ≤ 500ms'}</div>
            <div className="terminal-text">{'> Consistency is key for high score'}</div>
            <div className="terminal-text">{'> Results saved automatically'}</div>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            OPTIMAL: 200-300ms intervals | GAMING READY: &lt;200ms
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Error boundary wrapper for DoubleClickTestCore
const DoubleClickTestWithErrorBoundary: React.FC<DoubleClickTestCoreProps> = (props) => (
  <ErrorBoundary>
    <DoubleClickTestCore {...props} />
  </ErrorBoundary>
)

export default DoubleClickTestWithErrorBoundary
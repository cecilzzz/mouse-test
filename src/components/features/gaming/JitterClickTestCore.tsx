'use client'

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { RotateCcw, Play, Zap } from 'lucide-react'
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import type { JitterClickTestResult } from '@/types'

interface JitterClickTestCoreProps {
  duration?: number
  title?: string
  description?: string
  onResultChange?: (result: JitterClickTestResult | null) => void
  onStatusChange?: (status: TestState) => void
  onStatsChange?: (stats: TestStats) => void
  onError?: (error: string | null) => void
}

type TestState = 'idle' | 'ready' | 'running' | 'finished'

interface TestStats {
  clickCount: number
  timeLeft: number
  cps: number
  jitterLevel: number
  consistency: number
  bestScore: number
}

/**
 * JitterClickTestCore Component
 * 
 * 純抖動點擊測試邏輯組件，不包含佈局。專注於Jitter Click技術測試。
 * 檢測抖動點擊模式、速度、一致性等遊戲相關指標。
 * 
 * @component
 * @example
 * ```tsx
 * <JitterClickTestCore
 *   duration={10}
 *   title="JITTER CLICK TEST"
 *   onResultChange={handleResult}
 *   onStatsChange={handleStats}
 *   onError={handleError}
 * />
 * ```
 * 
 * @param duration - 測試持續時間（秒），預設10秒
 * @param title - 測試標題
 * @param description - 測試描述
 * @param onResultChange - 測試結果變化回調
 * @param onStatusChange - 測試狀態變化回調
 * @param onStatsChange - 統計數據變化回調
 * @param onError - 錯誤處理回調
 * 
 * @returns {JSX.Element} 純Jitter Click測試組件
 * 
 * @features
 * - 純測試邏輯，無佈局干擾
 * - Jitter Click技術檢測
 * - 點擊間隔分析和抖動檢測
 * - 一致性評分算法
 * - 實時統計和最佳成績記錄
 * - localStorage數據持久化
 * - 遊戲專用視覺效果
 * 
 * @design
 * - 專注於核心測試功能
 * - 通過props回調與外部通信
 * - 保持cyberpunk/gaming視覺風格
 * - 專為Minecraft PvP和競技遊戲設計
 * - 抖動級別視覺化指示器
 */
const JitterClickTestCore: React.FC<JitterClickTestCoreProps> = ({ 
  duration = 10,
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
  const [jitterLevel, setJitterLevel] = useState(0)
  const [consistency, setConsistency] = useState(100)
  const [bestScore, setBestScore] = useState<number>(0)
  const [isCountdown, setIsCountdown] = useState(false)
  const [countdownValue, setCountdownValue] = useState(3)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)
  const testStartTimeRef = useRef<number>(0)
  const clickTimestampsRef = useRef<number[]>([])
  const clickIntervalsRef = useRef<number[]>([])

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
      const savedScore = safeLocalStorage.getItem(`jitter-click-best-${duration}s`)
      if (savedScore) {
        setBestScore(parseFloat(savedScore))
      }
    } catch (error) {
      console.warn('Failed to load best score:', error)
      onError?.('Failed to load previous scores')
    }
  }, [duration, safeLocalStorage, onError])

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
      jitterLevel,
      consistency,
      bestScore
    })
  }, [clickCount, timeLeft, cps, jitterLevel, consistency, bestScore, onStatsChange])

  const resetTest = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (countdownRef.current) clearInterval(countdownRef.current)
    
    setTestState('idle')
    setClickCount(0)
    setTimeLeft(duration)
    setCps(0)
    setJitterLevel(0)
    setConsistency(100)
    setIsCountdown(false)
    setCountdownValue(3)
    clickTimestampsRef.current = []
    clickIntervalsRef.current = []
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

  const analyzeJitterPattern = useCallback((intervals: number[]) => {
    if (intervals.length < 3) return { jitterLevel: 0, consistency: 100 }
    
    // Calculate jitter level based on interval variation and speed
    const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length
    const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - avgInterval, 2), 0) / intervals.length
    const stdDev = Math.sqrt(variance)
    
    // Jitter level: higher variation in short intervals suggests jitter clicking
    const jitterScore = avgInterval < 100 ? Math.min(100, (stdDev / avgInterval) * 200) : 0
    
    // Consistency: how consistent the clicking pattern is
    const consistencyScore = Math.max(0, 100 - (stdDev / avgInterval) * 50)
    
    return { 
      jitterLevel: jitterScore, 
      consistency: consistencyScore 
    }
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
    
    // Calculate interval from previous click
    if (clickTimestampsRef.current.length > 1) {
      const interval = now - clickTimestampsRef.current[clickTimestampsRef.current.length - 2]
      clickIntervalsRef.current.push(interval)
      
      // Analyze jitter pattern
      const { jitterLevel: newJitterLevel, consistency: newConsistency } = analyzeJitterPattern(clickIntervalsRef.current)
      setJitterLevel(newJitterLevel)
      setConsistency(newConsistency)
    }
    
    setClickCount(prev => {
      const newCount = prev + 1
      const elapsed = (now - testStartTimeRef.current) / 1000
      const currentCps = elapsed > 0 ? newCount / elapsed : 0
      setCps(currentCps)
      return newCount
    })
  }, [testState, startCountdown, analyzeJitterPattern])

  // Calculate final results
  useEffect(() => {
    if (testState === 'finished') {
      try {
        const finalCps = clickCount / duration
        setCps(finalCps)
        
        const { jitterLevel: finalJitterLevel, consistency: finalConsistency } = analyzeJitterPattern(clickIntervalsRef.current)
        const jitterScore = finalCps * (finalJitterLevel / 100) // Bonus for jitter technique
        const finalScore = finalCps + jitterScore
        
        // Save best score
        if (finalScore > bestScore) {
          setBestScore(finalScore)
          safeLocalStorage.setItem(`jitter-click-best-${duration}s`, finalScore.toString())
        }
        
        // Determine if jitter technique was used (high variation, fast clicks)
        const avgInterval = clickIntervalsRef.current.length > 0 
          ? clickIntervalsRef.current.reduce((sum, interval) => sum + interval, 0) / clickIntervalsRef.current.length 
          : 0
        const isJitterTechnique = avgInterval < 100 && finalJitterLevel > 30
        
        // Create and save test result
        const result: JitterClickTestResult = {
          clicksPerSecond: finalCps,
          totalClicks: clickCount,
          testDuration: duration,
          jitterTechnique: isJitterTechnique ? 'jitter' : 'regular',
          averageInterval: avgInterval,
          consistency: finalConsistency,
          timestamp: new Date()
        }
        
        onResultChange?.(result)
        
        const existingResultsStr = safeLocalStorage.getItem('jitter-click-test-history') || '[]'
        const existingResults = JSON.parse(existingResultsStr)
        existingResults.push(result)
        safeLocalStorage.setItem('jitter-click-test-history', JSON.stringify(existingResults.slice(-50)))
      } catch (error) {
        console.warn('Failed to save test results:', error)
        onError?.('Failed to save results')
      }
    }
  }, [testState, clickCount, duration, bestScore, safeLocalStorage, onResultChange, onError, analyzeJitterPattern])

  const getJitterLevelColor = (level: number) => {
    if (level < 20) return 'text-electric-400'
    if (level < 50) return 'text-warning-orange-400'
    if (level < 80) return 'text-cyber-pink-400'
    return 'text-neon-green-400'
  }

  const getJitterLevelText = (level: number) => {
    if (level < 20) return 'REGULAR'
    if (level < 50) return 'MILD JITTER'
    if (level < 80) return 'JITTER CLICK'
    return 'PRO JITTER'
  }

  return (
    <Card className="test-card">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-hacker-purple-500 to-neon-green-500 flex items-center justify-center shadow-lg shadow-hacker-purple-500/30">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-black hero-gradient">
              {title || "JITTER CLICK TEST"}
            </CardTitle>
            <CardDescription className="text-lg mt-1 font-mono text-electric-600 dark:text-electric-400">
              {description || `>> ${duration} Second Jitter Click Challenge`}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Click Area */}
        <div className="flex justify-center">
          <div 
            className={`click-area ${testState === 'running' ? 'active' : ''} ${isCountdown ? 'countdown' : ''}`}
            onMouseDown={handleClick}
            style={{
              width: '400px',
              height: '300px',
              background: testState === 'running' ? 'linear-gradient(45deg, #000000, #1a0a2a)' : '#000000',
              border: `3px solid ${testState === 'running' ? '#8a2be2' : '#333333'}`,
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.3s ease',
              boxShadow: testState === 'running' ? '0 0 30px rgba(138, 43, 226, 0.5)' : 'none',
              position: 'relative',
            }}
          >
            {isCountdown ? (
              <div className="text-center">
                <div className="text-8xl font-black text-warning-orange-500 mb-4 animate-pulse">
                  {countdownValue}
                </div>
                <p className="text-xl font-mono text-electric-400">PREPARE FOR JITTER...</p>
              </div>
            ) : testState === 'idle' ? (
              <div className="text-center space-y-4">
                <div className="text-6xl">⚡</div>
                <div className="space-y-2">
                  <p className="text-2xl font-black text-hacker-purple-400">CLICK TO START</p>
                  <p className="text-lg font-mono text-electric-400">Master the jitter click technique!</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    Duration: {duration} seconds
                  </p>
                </div>
              </div>
            ) : testState === 'running' ? (
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <div className="text-6xl font-black text-hacker-purple-400 cps-counter">
                    {clickCount}
                  </div>
                  <p className="text-xl font-mono text-electric-400">CLICKS</p>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-black text-neon-green-400">
                    {timeLeft.toFixed(1)}s
                  </div>
                  <div className="text-lg font-mono text-cyber-pink-400">
                    CPS: {cps.toFixed(2)}
                  </div>
                  <div className={`text-sm font-mono ${getJitterLevelColor(jitterLevel)}`}>
                    {getJitterLevelText(jitterLevel)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-4xl font-black text-hacker-purple-400">JITTER COMPLETE!</div>
                <div className="space-y-2">
                  <div className="text-6xl font-black text-neon-green-400 cps-counter">
                    {cps.toFixed(2)}
                  </div>
                  <p className="text-xl font-mono text-electric-400">CPS</p>
                </div>
                <div className="space-y-1 text-sm font-mono text-muted-foreground">
                  <div className={getJitterLevelColor(jitterLevel)}>
                    {getJitterLevelText(jitterLevel)}
                  </div>
                  <div>Consistency: {consistency.toFixed(1)}%</div>
                </div>
              </div>
            )}
            
            {/* Corner decorations */}
            <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-hacker-purple-500"></div>
            <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-hacker-purple-500"></div>
            <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-hacker-purple-500"></div>
            <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-hacker-purple-500"></div>
          </div>
        </div>

        {/* Stats Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 glass-effect rounded-lg border border-hacker-purple-500/30">
            <div className="text-2xl font-black text-hacker-purple-400">{clickCount}</div>
            <div className="text-xs font-mono text-muted-foreground">CLICKS</div>
          </div>
          <div className="text-center p-4 glass-effect rounded-lg border border-neon-green-500/30">
            <div className="text-2xl font-black text-neon-green-400">{cps.toFixed(1)}</div>
            <div className="text-xs font-mono text-muted-foreground">CPS</div>
          </div>
          <div className="text-center p-4 glass-effect rounded-lg border border-cyber-pink-500/30">
            <div className={`text-2xl font-black ${getJitterLevelColor(jitterLevel)}`}>{jitterLevel.toFixed(0)}</div>
            <div className="text-xs font-mono text-muted-foreground">JITTER LVL</div>
          </div>
          <div className="text-center p-4 glass-effect rounded-lg border border-electric-500/30">
            <div className="text-2xl font-black text-electric-400">{consistency.toFixed(0)}%</div>
            <div className="text-xs font-mono text-muted-foreground">CONSISTENCY</div>
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
              className="bg-gradient-to-r from-hacker-purple-600 to-neon-green-600 border-2 border-hacker-purple-400 text-white hover:from-hacker-purple-500 hover:to-neon-green-500 hover:shadow-lg hover:shadow-hacker-purple-500/50 active:scale-95 transition-all duration-150 gap-2"
              size="lg"
            >
              <Play className="w-4 h-4" />
              Jitter Again
            </Button>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center space-y-4 p-6 glass-effect rounded-lg border border-hacker-purple-500/30">
          <p className="text-lg font-bold font-mono text-electric-400">
            {'>> JITTER CLICK TRAINING PROTOCOL'}
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="terminal-text">{'> Use rapid wrist movements'}</div>
            <div className="terminal-text">{'> Maintain finger tension'}</div>
            <div className="terminal-text">{'> Focus on consistency'}</div>
            <div className="terminal-text">{'> Perfect for Minecraft PvP'}</div>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            PRO TIP: 10+ CPS with 70%+ consistency = Elite Jitter Clicker
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Error boundary wrapper for JitterClickTestCore
const JitterClickTestWithErrorBoundary: React.FC<JitterClickTestCoreProps> = (props) => (
  <ErrorBoundary>
    <JitterClickTestCore {...props} />
  </ErrorBoundary>
)

export default JitterClickTestWithErrorBoundary
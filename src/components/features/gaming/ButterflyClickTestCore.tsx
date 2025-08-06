'use client'

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { RotateCcw, Play, Heart } from 'lucide-react'
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import type { ButterflyClickTestResult } from './types'
import './styles.css'

interface ButterflyClickTestCoreProps {
  duration?: number
  title?: string
  description?: string
  onResultChange?: (result: ButterflyClickTestResult | null) => void
  onStatusChange?: (status: TestState) => void
  onStatsChange?: (stats: TestStats) => void
  onError?: (error: string | null) => void
}

type TestState = 'idle' | 'ready' | 'running' | 'finished'

interface TestStats {
  clickCount: number
  timeLeft: number
  cps: number
  butterflyLevel: number
  fingerCoordination: number
  bestScore: number
}

/**
 * ButterflyClickTestCore Component
 * 
 * 純蝴蝶點擊測試邏輯組件，不包含佈局。專注於Butterfly Click技術測試。
 * 檢測雙指協調、節奏、一致性等遊戲相關指標。
 * 
 * @component
 * @example
 * ```tsx
 * <ButterflyClickTestCore
 *   duration={10}
 *   title="BUTTERFLY CLICK TEST"
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
 * @returns {JSX.Element} 純Butterfly Click測試組件
 * 
 * @features
 * - 純測試邏輯，無佈局干擾
 * - Butterfly Click技術檢測
 * - 雙指協調性分析
 * - 節奏一致性評分算法
 * - 實時統計和最佳成績記錄
 * - localStorage數據持久化
 * - 遊戲專用視覺效果
 * 
 * @design
 * - 專注於核心測試功能
 * - 通過props回調與外部通信
 * - 保持cyberpunk/gaming視覺風格
 * - 專為Minecraft PvP和競技遊戲設計
 * - 蝴蝶級別視覺化指示器
 */
const ButterflyClickTestCore: React.FC<ButterflyClickTestCoreProps> = ({ 
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
  const [butterflyLevel, setButterflyLevel] = useState(0)
  const [fingerCoordination, setFingerCoordination] = useState(100)
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
      const savedScore = safeLocalStorage.getItem(`butterfly-click-best-${duration}s`)
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
      butterflyLevel,
      fingerCoordination,
      bestScore
    })
  }, [clickCount, timeLeft, cps, butterflyLevel, fingerCoordination, bestScore, onStatsChange])

  const resetTest = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (countdownRef.current) clearInterval(countdownRef.current)
    
    setTestState('idle')
    setClickCount(0)
    setTimeLeft(duration)
    setCps(0)
    setButterflyLevel(0)
    setFingerCoordination(100)
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

  const analyzeButterflyPattern = useCallback((intervals: number[]) => {
    if (intervals.length < 4) return { butterflyLevel: 0, fingerCoordination: 100 }
    
    // Analyze rhythm consistency for butterfly clicking
    // Butterfly clicking should show alternating finger pattern (more consistent than jitter)
    const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length
    const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - avgInterval, 2), 0) / intervals.length
    const stdDev = Math.sqrt(variance)
    
    // Butterfly level: consistent intervals in 50-150ms range suggests butterfly technique
    const idealRange = avgInterval > 50 && avgInterval < 150
    const consistency = stdDev / avgInterval
    const butterflyScore = idealRange && consistency < 0.5 ? Math.min(100, (1 / consistency) * 20) : 0
    
    // Finger coordination: how well the alternating pattern is maintained
    const coordinationScore = Math.max(0, 100 - (consistency * 100))
    
    return { 
      butterflyLevel: butterflyScore, 
      fingerCoordination: coordinationScore 
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
      
      // Analyze butterfly pattern
      const { butterflyLevel: newButterflyLevel, fingerCoordination: newCoordination } = analyzeButterflyPattern(clickIntervalsRef.current)
      setButterflyLevel(newButterflyLevel)
      setFingerCoordination(newCoordination)
    }
    
    setClickCount(prev => {
      const newCount = prev + 1
      const elapsed = (now - testStartTimeRef.current) / 1000
      const currentCps = elapsed > 0 ? newCount / elapsed : 0
      setCps(currentCps)
      return newCount
    })
  }, [testState, startCountdown, analyzeButterflyPattern])

  // Calculate final results
  useEffect(() => {
    if (testState === 'finished') {
      try {
        const finalCps = clickCount / duration
        setCps(finalCps)
        
        const { butterflyLevel: finalButterflyLevel, fingerCoordination: finalCoordination } = analyzeButterflyPattern(clickIntervalsRef.current)
        const butterflyScore = finalCps * (finalButterflyLevel / 100) // Bonus for butterfly technique
        const finalScore = finalCps + butterflyScore
        
        // Save best score
        if (finalScore > bestScore) {
          setBestScore(finalScore)
          safeLocalStorage.setItem(`butterfly-click-best-${duration}s`, finalScore.toString())
        }
        
        // Determine if butterfly technique was used (consistent intervals, good coordination)
        const avgInterval = clickIntervalsRef.current.length > 0 
          ? clickIntervalsRef.current.reduce((sum, interval) => sum + interval, 0) / clickIntervalsRef.current.length 
          : 0
        const isButterflyTechnique = avgInterval > 50 && avgInterval < 150 && finalButterflyLevel > 40
        
        // Create and save test result
        const result: ButterflyClickTestResult = {
          clicksPerSecond: finalCps,
          totalClicks: clickCount,
          testDuration: duration,
          butterflyTechnique: isButterflyTechnique ? 'butterfly' : 'regular',
          averageInterval: avgInterval,
          fingerCoordination: finalCoordination,
          timestamp: new Date()
        }
        
        onResultChange?.(result)
        
        const existingResultsStr = safeLocalStorage.getItem('butterfly-click-test-history') || '[]'
        const existingResults = JSON.parse(existingResultsStr)
        existingResults.push(result)
        safeLocalStorage.setItem('butterfly-click-test-history', JSON.stringify(existingResults.slice(-50)))
      } catch (error) {
        console.warn('Failed to save test results:', error)
        onError?.('Failed to save results')
      }
    }
  }, [testState, clickCount, duration, bestScore, safeLocalStorage, onResultChange, onError, analyzeButterflyPattern])

  const getButterflyLevelColor = (level: number) => {
    if (level < 20) return 'text-electric-400'
    if (level < 50) return 'text-warning-orange-400'
    if (level < 80) return 'text-cyber-pink-400'
    return 'text-neon-green-400'
  }

  const getButterflyLevelText = (level: number) => {
    if (level < 20) return 'REGULAR'
    if (level < 50) return 'MILD BUTTERFLY'
    if (level < 80) return 'BUTTERFLY CLICK'
    return 'PRO BUTTERFLY'
  }

  return (
    <Card className="test-card">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyber-pink-500 to-electric-500 flex items-center justify-center shadow-lg shadow-cyber-pink-500/30">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-black hero-gradient">
              {title || "BUTTERFLY CLICK TEST"}
            </CardTitle>
            <CardDescription className="text-lg mt-1 font-mono text-electric-600 dark:text-electric-400">
              {description || `>> ${duration} Second Butterfly Click Challenge`}
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
                <p className="text-xl font-mono text-electric-400">SPREAD YOUR WINGS...</p>
              </div>
            ) : testState === 'idle' ? (
              <div className="text-center space-y-4">
                <div className="text-6xl">🦋</div>
                <div className="space-y-2">
                  <p className="text-2xl font-black text-cyber-pink-400">CLICK TO START</p>
                  <p className="text-lg font-mono text-electric-400">Master the butterfly click technique!</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    Duration: {duration} seconds
                  </p>
                </div>
              </div>
            ) : testState === 'running' ? (
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <div className="text-6xl font-black text-cyber-pink-400 cps-counter">
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
                  <div className={`text-sm font-mono ${getButterflyLevelColor(butterflyLevel)}`}>
                    {getButterflyLevelText(butterflyLevel)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-4xl font-black text-cyber-pink-400">BUTTERFLY COMPLETE!</div>
                <div className="space-y-2">
                  <div className="text-6xl font-black text-neon-green-400 cps-counter">
                    {cps.toFixed(2)}
                  </div>
                  <p className="text-xl font-mono text-electric-400">CPS</p>
                </div>
                <div className="space-y-1 text-sm font-mono text-muted-foreground">
                  <div className={getButterflyLevelColor(butterflyLevel)}>
                    {getButterflyLevelText(butterflyLevel)}
                  </div>
                  <div>Coordination: {fingerCoordination.toFixed(1)}%</div>
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
            <div className="text-2xl font-black text-cyber-pink-400">{clickCount}</div>
            <div className="text-xs font-mono text-muted-foreground">CLICKS</div>
          </div>
          <div className="text-center p-4 glass-effect rounded-lg border border-neon-green-500/30">
            <div className="text-2xl font-black text-neon-green-400">{cps.toFixed(1)}</div>
            <div className="text-xs font-mono text-muted-foreground">CPS</div>
          </div>
          <div className="text-center p-4 glass-effect rounded-lg border border-electric-500/30">
            <div className={`text-2xl font-black ${getButterflyLevelColor(butterflyLevel)}`}>{butterflyLevel.toFixed(0)}</div>
            <div className="text-xs font-mono text-muted-foreground">BUTTERFLY LVL</div>
          </div>
          <div className="text-center p-4 glass-effect rounded-lg border border-warning-orange-500/30">
            <div className="text-2xl font-black text-warning-orange-400">{fingerCoordination.toFixed(0)}%</div>
            <div className="text-xs font-mono text-muted-foreground">COORDINATION</div>
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
              className="bg-gradient-to-r from-cyber-pink-600 to-electric-600 border-2 border-cyber-pink-400 text-white hover:from-cyber-pink-500 hover:to-electric-500 hover:shadow-lg hover:shadow-cyber-pink-500/50 active:scale-95 transition-all duration-150 gap-2"
              size="lg"
            >
              <Play className="w-4 h-4" />
              Fly Again
            </Button>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center space-y-4 p-6 glass-effect rounded-lg border border-cyber-pink-500/30">
          <p className="text-lg font-bold font-mono text-electric-400">
            {'>> BUTTERFLY CLICK TRAINING PROTOCOL'}
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="terminal-text">{'> Use two fingers alternating'}</div>
            <div className="terminal-text">{'> Maintain consistent rhythm'}</div>
            <div className="terminal-text">{'> Focus on coordination'}</div>
            <div className="terminal-text">{'> Perfect for sustained gaming'}</div>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            PRO TIP: 12+ CPS with 80%+ coordination = Elite Butterfly Clicker
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Error boundary wrapper for ButterflyClickTestCore
const ButterflyClickTestWithErrorBoundary: React.FC<ButterflyClickTestCoreProps> = (props) => (
  <ErrorBoundary>
    <ButterflyClickTestCore {...props} />
  </ErrorBoundary>
)

export default ButterflyClickTestWithErrorBoundary
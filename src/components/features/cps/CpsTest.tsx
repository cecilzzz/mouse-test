'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RotateCcw, Timer, Zap, Play } from 'lucide-react'
import type { CpsTestResult } from '@/types'

interface CpsTestProps {
  duration: number
  testType?: 'left' | 'right' | 'spacebar' | 'mobile'
  title?: string
  description?: string
}

type TestState = 'idle' | 'ready' | 'running' | 'finished'

const CpsTest: React.FC<CpsTestProps> = ({ 
  duration, 
  testType = 'left',
  title,
  description 
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

  // Load best score from localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem(`cps-best-${duration}s-${testType}`)
    if (savedScore) {
      setBestScore(parseFloat(savedScore))
    }
  }, [duration, testType])

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
  }, [duration])

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
      const finalCps = clickCount / duration
      setCps(finalCps)
      
      // Save best score
      if (finalCps > bestScore) {
        setBestScore(finalCps)
        localStorage.setItem(`cps-best-${duration}s-${testType}`, finalCps.toString())
      }
      
      // Save test result
      const result: CpsTestResult = {
        clicksPerSecond: finalCps,
        totalClicks: clickCount,
        testDuration: duration,
        timestamp: new Date()
      }
      
      const existingResults = JSON.parse(localStorage.getItem('cps-test-history') || '[]')
      existingResults.push(result)
      localStorage.setItem('cps-test-history', JSON.stringify(existingResults.slice(-50))) // Keep last 50 results
    }
  }, [testState, clickCount, duration, bestScore, testType])

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
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main CPS Test */}
        <div className="lg:col-span-2">
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
                    {description || `{'>> '}{duration} Second Click Speed Test`}
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
                    className="cyber-button gap-2"
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
        </div>

        {/* Stats Panel */}
        <div className="space-y-6">
          <Card className="test-card bg-black/90 border-electric-500/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-electric-400 font-mono">
                <Zap className="w-5 h-5 text-neon-green-500" />
                LIVE STATS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="cps-counter mb-2">{testState === 'finished' ? cps.toFixed(2) : cps.toFixed(1)}</div>
                <p className="text-sm text-muted-foreground font-mono">CURRENT CPS</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-900/50 rounded border border-gray-700">
                  <span className="text-sm font-mono font-bold text-electric-400">CLICKS:</span>
                  <Badge variant="outline" className="font-mono bg-black border-neon-green-500 text-neon-green-400">{clickCount}</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-900/50 rounded border border-gray-700">
                  <span className="text-sm font-mono font-bold text-electric-400">TIME LEFT:</span>
                  <Badge variant="outline" className="font-mono bg-black border-cyber-pink-500 text-cyber-pink-400">
                    {timeLeft.toFixed(1)}s
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-900/50 rounded border border-gray-700">
                  <span className="text-sm font-mono font-bold text-electric-400">BEST:</span>
                  <Badge variant="outline" className="font-mono bg-black border-warning-orange-500 text-warning-orange-400">
                    {bestScore.toFixed(2)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="test-card bg-black/90 border-cyber-pink-500/50">
            <CardHeader>
              <CardTitle className="text-cyber-pink-400 font-mono">QUICK TESTS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full cyber-button">
                <a href="/cps/1-second">1 SECOND {'>'}</a>
              </Button>
              <Button asChild className="w-full cyber-button">
                <a href="/cps/5-second">5 SECOND {'>'}</a>
              </Button>
              <Button asChild className="w-full cyber-button">
                <a href="/cps/10-second">10 SECOND {'>'}</a>
              </Button>
              <Button asChild variant="outline" className="w-full font-mono border-hacker-purple-500 text-hacker-purple-400 hover:bg-hacker-purple-500 hover:text-white">
                <a href="/button-test">BUTTON TEST {'>'}</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CpsTest
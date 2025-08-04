import { useState, useCallback, useRef, useEffect } from 'react'

type TestState = 'idle' | 'ready' | 'running' | 'finished'

interface UseCpsTimerProps {
  duration: number
  onTestComplete: (clickCount: number, cps: number) => void
}

export function useCpsTimer({ duration, onTestComplete }: UseCpsTimerProps) {
  const [testState, setTestState] = useState<TestState>('idle')
  const [clickCount, setClickCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(duration)
  const [cps, setCps] = useState(0)
  const [isCountdown, setIsCountdown] = useState(false)
  const [countdownValue, setCountdownValue] = useState(3)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)
  const testStartTimeRef = useRef<number>(0)

  const resetTest = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (countdownRef.current) clearInterval(countdownRef.current)
    
    setTestState('idle')
    setClickCount(0)
    setTimeLeft(duration)
    setCps(0)
    setIsCountdown(false)
    setCountdownValue(3)
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

  const handleClick = useCallback(() => {
    if (testState === 'idle') {
      setTestState('ready')
      startCountdown()
      return
    }
    
    if (testState !== 'running') return

    const now = Date.now()
    
    setClickCount(prev => {
      const newCount = prev + 1
      const elapsed = (now - testStartTimeRef.current) / 1000
      const currentCps = elapsed > 0 ? newCount / elapsed : 0
      setCps(currentCps)
      return newCount
    })
  }, [testState, startCountdown])

  // Calculate final results when test finishes
  useEffect(() => {
    if (testState === 'finished') {
      const finalCps = clickCount / duration
      setCps(finalCps)
      onTestComplete(clickCount, finalCps)
    }
  }, [testState, clickCount, duration, onTestComplete])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [])

  return {
    testState,
    clickCount,
    timeLeft,
    cps,
    isCountdown,
    countdownValue,
    handleClick,
    resetTest,
    startTest: startCountdown
  }
}
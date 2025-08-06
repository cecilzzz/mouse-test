import { useCallback, useState, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { CpsTestResult } from '@/components/features/cps/types'

interface UseCpsDataProps {
  duration: number
  testType: string
}

interface UseCpsDataReturn {
  bestScore: number
  history: CpsTestResult[]
  saveResult: (result: CpsTestResult) => void
  isLoading: boolean
  error: string | null
  clearHistory: () => void
  clearError: () => void
}

/**
 * Unified hook for managing CPS test data including localStorage operations,
 * best score tracking, and test history management.
 * 
 * @param duration - Test duration in seconds
 * @param testType - Type of test (left, right, spacebar, mobile)
 * @returns Object containing data and management functions
 */
export function useCpsData({ duration, testType }: UseCpsDataProps): UseCpsDataReturn {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Separate storage keys for different test configurations
  const bestScoreKey = `cps-best-${duration}s-${testType}`
  const historyKey = `cps-history-${duration}s-${testType}`

  // Use localStorage hooks for persistence
  const [bestScore, setBestScore] = useLocalStorage<number>(bestScoreKey, 0)
  const [history, setHistory] = useLocalStorage<CpsTestResult[]>(historyKey, [])

  // Initialize loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100) // Small delay to allow localStorage to initialize

    return () => clearTimeout(timer)
  }, [])

  /**
   * Save a new test result and update best score if needed
   */
  const saveResult = useCallback((result: CpsTestResult) => {
    try {
      setIsLoading(true)
      setError(null)

      // Update best score if this result is better
      if (result.clicksPerSecond > bestScore) {
        setBestScore(result.clicksPerSecond)
      }

      // Add to history (keep last 50 results per test type)
      setHistory(prevHistory => {
        const newHistory = [...prevHistory, result]
        return newHistory.slice(-50) // Keep only the most recent 50 results
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save test result'
      setError(errorMessage)
      console.error('Error saving CPS result:', err)
    } finally {
      setIsLoading(false)
    }
  }, [bestScore, setBestScore, setHistory])

  /**
   * Clear all test history for this configuration
   */
  const clearHistory = useCallback(() => {
    try {
      setError(null)
      setHistory([])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to clear history'
      setError(errorMessage)
      console.error('Error clearing CPS history:', err)
    }
  }, [setHistory])

  /**
   * Clear current error state
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    bestScore,
    history,
    saveResult,
    isLoading,
    error,
    clearHistory,
    clearError
  }
}
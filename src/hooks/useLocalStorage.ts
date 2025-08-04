import { useState, useMemo } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Safe localStorage access
  const safeLocalStorage = useMemo(() => ({
    getItem: (key: string): string | null => {
      try {
        if (typeof window === 'undefined') return null
        return localStorage.getItem(key)
      } catch (error) {
        console.warn('localStorage not available:', error)
        return null
      }
    },
    setItem: (key: string, value: string): void => {
      try {
        if (typeof window === 'undefined') return
        localStorage.setItem(key, value)
      } catch (error) {
        console.warn('localStorage not available:', error)
      }
    }
  }), [])

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = safeLocalStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      safeLocalStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue] as const
}
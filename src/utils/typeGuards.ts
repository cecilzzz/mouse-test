/**
 * 類型安全的工具函數
 * 提供類型守衛和工具函數來提高代碼安全性
 */

import type { Nullable, Optional, TestResult, CpsTestResult, DpiTestResult } from '@/types'

/**
 * 類型守衛：檢查值是否不為 null 或 undefined
 */
export function isNotNil<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

/**
 * 類型守衛：檢查是否為有效的滑鼠按鍵
 */
export function isValidMouseButton(button: string): button is keyof import('@/types').MouseButtonState {
  return ['left', 'right', 'middle', 'back', 'forward'].includes(button)
}

/**
 * 類型守衛：檢查是否為 CPS 測試結果
 */
export function isCpsTestResult(result: TestResult): result is TestResult & { details: CpsTestResult } {
  return result.testType === 'cps' && result.details !== undefined
}

/**
 * 類型守衛：檢查是否為 DPI 測試結果
 */
export function isDpiTestResult(result: TestResult): result is TestResult & { details: DpiTestResult } {
  return result.testType === 'dpi' && result.details !== undefined
}

/**
 * 安全的 JSON 解析，返回類型安全的結果
 */
export function safeJsonParse<T>(json: string): Optional<T> {
  try {
    return JSON.parse(json) as T
  } catch {
    return undefined
  }
}

/**
 * 安全的本地存儲獲取
 */
export function getLocalStorageItem(key: string): Optional<string> {
  if (typeof window === 'undefined') return undefined
  
  try {
    return localStorage.getItem(key) ?? undefined
  } catch {
    return undefined
  }
}

/**
 * 安全的本地存儲設置
 */
export function setLocalStorageItem(key: string, value: string): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

/**
 * 確保數值在指定範圍內
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * 格式化數字為指定小數位數
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals)
}

/**
 * 獲取隨機整數
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 延遲函數（Promise 版本）
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 節流函數
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * 防抖函數
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | undefined
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

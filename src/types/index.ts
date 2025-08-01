/**
 * 全局類型定義文件
 * 集中管理整個應用的 TypeScript 接口和類型
 */

// 滑鼠相關類型
export interface MouseButtonState {
  left: boolean
  right: boolean
  middle: boolean
  back: boolean
  forward: boolean
}

export interface ClickCount {
  left: number
  right: number
  middle: number
  back: number
  forward: number
}

// 測試工具類型
export interface TestTool {
  href: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  gradient: string
  border: string
  iconColor: string
  titleColor: string
  borderColor: string
}

// FAQ 相關類型
export type FaqCategory = 
  | 'basic' 
  | 'button' 
  | 'cps' 
  | 'dpi' 
  | 'performance' 
  | 'troubleshooting' 
  | 'accuracy' 
  | 'scroll' 
  | 'compatibility' 
  | 'gaming'

export interface FaqItem {
  question: string
  answer: string
  category: FaqCategory
}

export type CategoryColors = Record<FaqCategory, string>

// 測試結果類型
export interface TestResult {
  timestamp: Date
  testType: string
  score: number
  details?: Record<string, any>
}

// CPS 測試類型
export interface CpsTestResult {
  clicksPerSecond: number
  totalClicks: number
  testDuration: number
  timestamp: Date
}

// DPI 測試類型
export interface DpiTestResult {
  dpi: number
  pixelsPerInch: number
  accuracy: number
  timestamp: Date
}

// 工具函數類型
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type ValueOf<T> = T[keyof T]

// 事件處理函數類型
export type MouseEventHandler = (event: React.MouseEvent) => void
export type KeyboardEventHandler = (event: React.KeyboardEvent) => void
export type ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void

// 通用組件 Props 類型
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// API 相關類型
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

// 本地存儲類型
export interface LocalStorageData {
  testHistory: TestResult[]
  userPreferences: Record<string, any>
}

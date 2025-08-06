/**
 * Mouse Test Application Types
 * 
 * Custom type definitions for mouse testing functionality.
 * Only includes application-specific types, not React built-ins.
 */

// Mouse Testing
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

// UI Components
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

// FAQ System
export type FaqCategory = 
  | 'basic' | 'button' | 'cps' | 'dpi' | 'performance' 
  | 'troubleshooting' | 'accuracy' | 'scroll' | 'compatibility' | 'gaming'

export interface FaqItem {
  question: string
  answer: string
  category: FaqCategory
}

export type CategoryColors = Record<FaqCategory, string>
// Test Results
export interface TestResult {
  timestamp: Date
  testType: string
  score: number
  details?: Record<string, unknown>
}

export interface CpsTestResult {
  clicksPerSecond: number
  totalClicks: number
  testDuration: number
  timestamp: Date
}

export interface DoubleClickTestResult {
  averageInterval: number
  minInterval: number
  maxInterval: number
  totalDoubleClicks: number
  failedDoubleClicks: number
  consistency: number
  timestamp: Date
}

export interface ScrollTestResult {
  totalScrolls: number
  upScrolls: number
  downScrolls: number
  leftScrolls: number
  rightScrolls: number
  middleClicks: number
  timestamp: Date
}

export interface JitterClickTestResult {
  clicksPerSecond: number
  totalClicks: number
  testDuration: number
  jitterTechnique: 'jitter' | 'regular'
  averageInterval: number
  consistency: number
  timestamp: Date
}

export interface ButterflyClickTestResult {
  clicksPerSecond: number
  totalClicks: number
  testDuration: number
  butterflyTechnique: 'butterfly' | 'regular'
  averageInterval: number
  fingerCoordination: number
  timestamp: Date
}

export interface DpiTestResult {
  dpi: number
  pixelsPerInch: number
  accuracy: number
  timestamp: Date
}

// Storage
export interface LocalStorageData {
  testHistory: TestResult[]
  userPreferences: Record<string, unknown>
}

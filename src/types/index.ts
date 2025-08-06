/**
 * Mouse Test Application Types
 * 
 * Custom type definitions for mouse testing functionality.
 * Only includes application-specific types, not React built-ins.
 */

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
/**
 * Scroll Test Feature Types
 * 
 * Type definitions for scroll testing functionality.
 */

export interface ScrollTestResult {
  totalScrolls: number
  upScrolls: number
  downScrolls: number
  leftScrolls: number
  rightScrolls: number
  middleClicks: number
  timestamp: Date
}
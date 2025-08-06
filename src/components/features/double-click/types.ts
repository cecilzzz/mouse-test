/**
 * Double Click Test Feature Types
 * 
 * Type definitions for double-click testing functionality.
 */

export interface DoubleClickTestResult {
  averageInterval: number
  minInterval: number
  maxInterval: number
  totalDoubleClicks: number
  failedDoubleClicks: number
  consistency: number
  timestamp: Date
}
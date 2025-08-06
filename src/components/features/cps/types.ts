/**
 * CPS Test Feature Types
 * 
 * Type definitions for CPS (Clicks Per Second) testing functionality.
 */

export interface CpsTestResult {
  clicksPerSecond: number
  totalClicks: number
  testDuration: number
  timestamp: Date
}
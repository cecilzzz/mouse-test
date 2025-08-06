/**
 * Gaming Test Features Types
 * 
 * Type definitions for gaming-specific testing functionality.
 */

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
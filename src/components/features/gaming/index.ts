/**
 * Gaming Test Features - Public API
 */

export { default as JitterClickTestCore } from './JitterClickTestCore'
export { default as ButterflyClickTestCore } from './ButterflyClickTestCore'

export type { JitterClickTestResult, ButterflyClickTestResult } from './types'

// Import styles to ensure they're included
import './styles.css'
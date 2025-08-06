/**
 * CPS Test Feature - Public API
 */

export { default as CpsTestCore } from './CpsTestCore'
export { default as CpsTestSimplified } from './CpsTestSimplified'
export { default as CpsPageContent } from './CpsPageContent'

export type { CpsTestResult } from './types'

// Import styles to ensure they're included
import './styles.css'
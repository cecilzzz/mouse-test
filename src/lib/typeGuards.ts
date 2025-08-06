/**
 * Type Guards and Utility Functions
 * 
 * Collection of type-safe utility functions, type guards, and helper methods
 * for the Mouse Test application. Provides runtime type checking and common
 * operations with proper TypeScript support.
 * 
 * @fileoverview Type guards, validation functions, and utility helpers
 * @version 1.0.0
 * @author Mouse Test Team
 */

import type { TestResult, DpiTestResult } from '@/types'
import type { CpsTestResult } from '@/components/features/cps/types'

// ============================================================================
// TYPE GUARD FUNCTIONS
// ============================================================================

/**
 * Type Guard: Non-Null/Undefined Check
 * 
 * Checks if a value is neither null nor undefined, providing type narrowing.
 * Useful for filtering arrays and conditional logic with proper typing.
 * 
 * @template T - The type to check
 * @param {T | null | undefined} value - The value to check
 * @returns {value is T} True if value is not null or undefined
 * 
 * @example
 * ```typescript
 * const items = [1, null, 2, undefined, 3];
 * const validItems = items.filter(isNotNil); // Type: number[]
 * 
 * const maybeUser = getUserById(id);
 * if (isNotNil(maybeUser)) {
 *   // maybeUser is now typed as User, not User | null | undefined
 *   console.log(maybeUser.name);
 * }
 * ```
 */
export function isNotNil<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

/**
 * Type Guard: Valid Mouse Button Check
 * 
 * Validates if a string represents a valid mouse button name.
 * Provides type safety when working with dynamic button identifiers.
 * 
 * @param {string} button - The button name to validate
 * @returns {boolean} True if button is a valid mouse button name
 * 
 * @example
 * ```typescript
 * const handleButtonEvent = (buttonName: string) => {
 *   if (isValidMouseButton(buttonName)) {
 *     // buttonName is now typed as keyof MouseButtonState
 *     setButtonState(prev => ({ ...prev, [buttonName]: true }));
 *   }
 * };
 * ```
 */
export function isValidMouseButton(button: string): button is 'left' | 'right' | 'middle' | 'back' | 'forward' {
  return ['left', 'right', 'middle', 'back', 'forward'].includes(button)
}

/**
 * Type Guard: CPS Test Result Check
 * 
 * Determines if a generic TestResult contains CPS test data.
 * Enables type-safe access to CPS-specific properties.
 * 
 * @param {TestResult} result - The test result to check
 * @returns {boolean} True if result contains CPS test data
 * 
 * @example
 * ```typescript
 * const processTestResult = (result: TestResult) => {
 *   if (isCpsTestResult(result)) {
 *     // result.details is now typed as CpsTestResult
 *     console.log(`CPS: ${result.details.clicksPerSecond}`);
 *   }
 * };
 * ```
 */
export function isCpsTestResult(result: TestResult): result is TestResult & { details: CpsTestResult } {
  return result.testType === 'cps' && result.details !== undefined
}

/**
 * Type Guard: DPI Test Result Check
 * 
 * Determines if a generic TestResult contains DPI test data.
 * Enables type-safe access to DPI-specific properties.
 * 
 * @param {TestResult} result - The test result to check
 * @returns {boolean} True if result contains DPI test data
 * 
 * @example
 * ```typescript
 * const analyzeResult = (result: TestResult) => {
 *   if (isDpiTestResult(result)) {
 *     // result.details is now typed as DpiTestResult
 *     console.log(`DPI: ${result.details.dpi}`);
 *   }
 * };
 * ```
 */
export function isDpiTestResult(result: TestResult): result is TestResult & { details: DpiTestResult } {
  return result.testType === 'dpi' && result.details !== undefined
}

// ============================================================================
// PARSING & VALIDATION UTILITIES
// ============================================================================

/**
 * Safe JSON Parse
 * 
 * Safely parses JSON strings with proper error handling and TypeScript support.
 * Returns undefined instead of throwing on invalid JSON.
 * 
 * @template T - Expected return type
 * @param {string} json - JSON string to parse
 * @returns {T | undefined} Parsed object or undefined if parsing fails
 * 
 * @example
 * ```typescript
 * interface UserConfig { theme: string; language: string; }
 * 
 * const configJson = localStorage.getItem('userConfig');
 * const config = safeJsonParse<UserConfig>(configJson);
 * 
 * if (config) {
 *   applyTheme(config.theme);
 * }
 * ```
 */
export function safeJsonParse<T>(json: string): T | undefined {
  try {
    return JSON.parse(json) as T
  } catch {
    return undefined
  }
}

// ============================================================================
// LOCAL STORAGE UTILITIES
// ============================================================================

/**
 * Safe LocalStorage Get
 * 
 * Safely retrieves items from localStorage with SSR compatibility.
 * Handles cases where localStorage is unavailable (SSR, private browsing).
 * 
 * @param {string} key - The localStorage key to retrieve
 * @returns {string | undefined} The stored value or undefined
 * 
 * @example
 * ```typescript
 * const savedTheme = getLocalStorageItem('theme');
 * if (savedTheme) {
 *   document.documentElement.className = savedTheme;
 * }
 * ```
 */
export function getLocalStorageItem(key: string): string | undefined {
  if (typeof window === 'undefined') return undefined
  
  try {
    return localStorage.getItem(key) ?? undefined
  } catch {
    return undefined
  }
}

/**
 * Safe LocalStorage Set
 * 
 * Safely stores items in localStorage with error handling.
 * Returns success status for error handling in calling code.
 * 
 * @param {string} key - The localStorage key
 * @param {string} value - The value to store
 * @returns {boolean} True if storage was successful
 * 
 * @example
 * ```typescript
 * const saveUserPreference = (setting: string, value: string): boolean => {
 *   const success = setLocalStorageItem(`pref_${setting}`, value);
 *   if (!success) {
 *     showErrorMessage('Failed to save preference');
 *   }
 *   return success;
 * };
 * ```
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

// ============================================================================
// MATHEMATICAL UTILITIES
// ============================================================================

/**
 * Clamp Number
 * 
 * Constrains a number to be within a specified range.
 * Useful for ensuring values stay within valid bounds.
 * 
 * @param {number} value - The number to clamp
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {number} The clamped value
 * 
 * @example
 * ```typescript
 * const opacity = clamp(userInput, 0, 1); // Ensures 0 <= opacity <= 1
 * const cps = clamp(calculatedCps, 0, 50); // Reasonable CPS bounds
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Format Number
 * 
 * Formats a number to a specified number of decimal places.
 * Useful for displaying test results and measurements consistently.
 * 
 * @param {number} value - The number to format
 * @param {number} [decimals=2] - Number of decimal places
 * @returns {string} Formatted number string
 * 
 * @example
 * ```typescript
 * const cps = formatNumber(8.567, 2);     // "8.57"
 * const dpi = formatNumber(1600.0, 0);    // "1600"
 * const accuracy = formatNumber(0.9567, 1); // "1.0"
 * ```
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals)
}

/**
 * Generate Random Integer
 * 
 * Generates a random integer within the specified range (inclusive).
 * Useful for testing, demos, and randomized features.
 * 
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)  
 * @returns {number} Random integer between min and max
 * 
 * @example
 * ```typescript
 * const randomCps = getRandomInt(5, 15);    // Random CPS for demo
 * const testDuration = getRandomInt(5, 30); // Random test length
 * ```
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// ============================================================================
// ASYNC UTILITIES
// ============================================================================

/**
 * Delay Function
 * 
 * Creates a Promise that resolves after the specified time.
 * Useful for adding delays, animations, and testing scenarios.
 * 
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>} Promise that resolves after the delay
 * 
 * @example
 * ```typescript
 * const startTest = async () => {
 *   showCountdown("3...");
 *   await delay(1000);
 *   showCountdown("2...");
 *   await delay(1000);
 *   showCountdown("1...");
 *   await delay(1000);
 *   startActualTest();
 * };
 * ```
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

/**
 * Throttle Function
 * 
 * Limits function execution to at most once per specified time period.
 * Useful for performance optimization of frequently called functions.
 * 
 * @template T - Function type
 * @param {T} func - Function to throttle
 * @param {number} limit - Minimum time between calls (ms)
 * @returns {Function} Throttled function
 * 
 * @example
 * ```typescript
 * const updateMousePosition = throttle((x: number, y: number) => {
 *   setPosition({ x, y });
 * }, 16); // ~60fps limit
 * 
 * element.addEventListener('mousemove', (e) => {
 *   updateMousePosition(e.clientX, e.clientY);
 * });
 * ```
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Debounce Function
 * 
 * Delays function execution until after the specified time has passed
 * since the last call. Useful for search inputs and resize handlers.
 * 
 * @template T - Function type
 * @param {T} func - Function to debounce
 * @param {number} wait - Delay time in milliseconds
 * @returns {Function} Debounced function
 * 
 * @example
 * ```typescript
 * const saveUserInput = debounce((input: string) => {
 *   localStorage.setItem('userInput', input);
 * }, 500);
 * 
 * inputElement.addEventListener('input', (e) => {
 *   saveUserInput(e.target.value);
 * });
 * ```
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | undefined
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

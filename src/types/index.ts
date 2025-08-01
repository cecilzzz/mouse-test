/**
 * Global Type Definitions
 * 
 * Centralized TypeScript interfaces and types for the Mouse Test application.
 * Provides type safety and consistent data structures across all components.
 * 
 * @fileoverview Type definitions for mouse testing functionality, UI components, and data structures
 * @version 1.0.0
 * @author Mouse Test Team
 */

// ============================================================================
// MOUSE TESTING TYPES
// ============================================================================

/**
 * Mouse Button State Interface
 * 
 * Tracks the current pressed state of all standard mouse buttons.
 * Used for real-time visual feedback in the mouse button test component.
 * 
 * @interface MouseButtonState
 * @example
 * ```typescript
 * const buttonStates: MouseButtonState = {
 *   left: false,
 *   right: true,    // Right button currently pressed
 *   middle: false,
 *   back: false,
 *   forward: false
 * };
 * ```
 */
export interface MouseButtonState {
  /** Left mouse button state */
  left: boolean
  /** Right mouse button state */
  right: boolean  
  /** Middle mouse button (scroll wheel click) state */
  middle: boolean
  /** Back navigation button state */
  back: boolean
  /** Forward navigation button state */
  forward: boolean
}

/**
 * Click Count Interface
 * 
 * Stores cumulative click counts for each mouse button.
 * Used for tracking total interactions and usage patterns.
 * 
 * @interface ClickCount
 * @example
 * ```typescript
 * const clickCounts: ClickCount = {
 *   left: 150,      // 150 left clicks recorded
 *   right: 25,      // 25 right clicks recorded
 *   middle: 5,      // 5 middle clicks recorded
 *   back: 0,        // No back button clicks
 *   forward: 0      // No forward button clicks
 * };
 * ```
 */
export interface ClickCount {
  /** Total left mouse button clicks */
  left: number
  /** Total right mouse button clicks */
  right: number
  /** Total middle mouse button clicks */
  middle: number
  /** Total back button clicks */
  back: number
  /** Total forward button clicks */
  forward: number
}

// ============================================================================
// UI COMPONENT TYPES  
// ============================================================================

/**
 * Test Tool Interface
 * 
 * Defines the structure for navigation cards in the test tools section.
 * Each tool represents a specific mouse testing functionality.
 * 
 * @interface TestTool
 * @example
 * ```typescript
 * const cpsTest: TestTool = {
 *   href: '/cps',
 *   icon: ZapIcon,
 *   title: 'CPS TEST',
 *   description: 'MEASURE CLICK SPEED',
 *   gradient: 'from-neon-green-500 to-neon-green-600',
 *   border: 'border-neon-green-500/50 hover:border-neon-green-500',
 *   iconColor: 'text-black',
 *   titleColor: 'text-neon-green-400',
 *   borderColor: 'border-neon-green-400'
 * };
 * ```
 */
export interface TestTool {
  /** Navigation URL for the test tool */
  href: string
  /** Lucide React icon component */
  icon: React.ComponentType<{ className?: string }>
  /** Display title of the test tool */
  title: string
  /** Brief description of functionality */
  description: string
  /** CSS gradient classes for background */
  gradient: string
  /** CSS border classes with hover states */
  border: string
  /** CSS classes for icon color */
  iconColor: string
  /** CSS classes for title color */
  titleColor: string
  /** CSS classes for border color accents */
  borderColor: string
}

// ============================================================================
// FAQ SYSTEM TYPES
// ============================================================================

/**
 * FAQ Category Type
 * 
 * Predefined categories for organizing FAQ items with color-coded styling.
 * Each category has associated visual theming in the UI.
 * 
 * @type FaqCategory
 */
export type FaqCategory = 
  | 'basic'           // General mouse testing information
  | 'button'          // Mouse button functionality
  | 'cps'             // Clicks Per Second testing
  | 'dpi'             // DPI sensitivity testing
  | 'performance'     // Hz and performance metrics
  | 'troubleshooting' // Common issues and solutions
  | 'accuracy'        // Precision and tracking tests
  | 'scroll'          // Scroll wheel functionality
  | 'compatibility'   // Device and software compatibility
  | 'gaming'          // Gaming-specific features

/**
 * FAQ Item Interface
 * 
 * Structure for individual FAQ entries with categorization support.
 * Used for SEO-optimized content organization.
 * 
 * @interface FaqItem
 * @example
 * ```typescript
 * const faqItem: FaqItem = {
 *   question: "What is a CPS Test?",
 *   answer: "CPS (Clicks Per Second) test measures clicking speed...",
 *   category: "cps"
 * };
 * ```
 */
export interface FaqItem {
  /** The FAQ question (used as H2 heading for SEO) */
  question: string
  /** Detailed answer with technical information */
  answer: string
  /** Category for color coding and organization */
  category: FaqCategory
}

/**
 * Category Colors Type
 * 
 * Maps FAQ categories to their corresponding CSS gradient classes.
 * Ensures consistent color theming across the application.
 * 
 * @type CategoryColors
 */
export type CategoryColors = Record<FaqCategory, string>

// ============================================================================
// TEST RESULTS & DATA TYPES
// ============================================================================

/**
 * Test Result Interface
 * 
 * Generic structure for storing test results across different testing tools.
 * Provides consistent data format for analytics and history tracking.
 * 
 * @interface TestResult
 * @example
 * ```typescript
 * const cpsResult: TestResult = {
 *   timestamp: new Date(),
 *   testType: 'cps',
 *   score: 8.5,
 *   details: {
 *     clicksPerSecond: 8.5,
 *     totalClicks: 85,
 *     testDuration: 10
 *   }
 * };
 * ```
 */
export interface TestResult {
  /** When the test was performed */
  timestamp: Date
  /** Type of test performed (cps, dpi, accuracy, etc.) */
  testType: string
  /** Primary score/result value */
  score: number
  /** Additional test-specific data */
  details?: Record<string, any>
}

/**
 * CPS Test Result Interface
 * 
 * Specific data structure for Clicks Per Second test results.
 * Used for gaming performance analysis and improvement tracking.
 * 
 * @interface CpsTestResult
 * @example
 * ```typescript
 * const cpsData: CpsTestResult = {
 *   clicksPerSecond: 12.3,
 *   totalClicks: 123,
 *   testDuration: 10,
 *   timestamp: new Date()
 * };
 * ```
 */
export interface CpsTestResult {
  /** Average clicks per second achieved */
  clicksPerSecond: number
  /** Total number of clicks during test */
  totalClicks: number
  /** Test duration in seconds */
  testDuration: number
  /** When the test was completed */
  timestamp: Date
}

/**
 * DPI Test Result Interface
 * 
 * Data structure for mouse DPI (Dots Per Inch) test results.
 * Helps users understand their mouse sensitivity settings.
 * 
 * @interface DpiTestResult
 * @example
 * ```typescript
 * const dpiData: DpiTestResult = {
 *   dpi: 1600,
 *   pixelsPerInch: 96,
 *   accuracy: 0.95,
 *   timestamp: new Date()
 * };
 * ```
 */
export interface DpiTestResult {
  /** Calculated DPI value */
  dpi: number
  /** Screen pixels per inch */
  pixelsPerInch: number
  /** Accuracy score (0-1) */
  accuracy: number
  /** When the test was completed */
  timestamp: Date
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Nullable Type Utility
 * 
 * Represents a value that can be null.
 * 
 * @template T - The base type
 * @example
 * ```typescript
 * const userId: Nullable<string> = getUserId() || null;
 * ```
 */
export type Nullable<T> = T | null

/**
 * Optional Type Utility
 * 
 * Represents a value that can be undefined.
 * 
 * @template T - The base type
 * @example
 * ```typescript
 * const config: Optional<AppConfig> = loadConfig();
 * ```
 */
export type Optional<T> = T | undefined

/**
 * ValueOf Type Utility
 * 
 * Extracts the value types from an object type.
 * 
 * @template T - The object type
 * @example
 * ```typescript
 * type Status = ValueOf<{ PENDING: 'pending', COMPLETE: 'complete' }>;
 * // Result: 'pending' | 'complete'
 * ```
 */
export type ValueOf<T> = T[keyof T]

// ============================================================================
// EVENT HANDLER TYPES
// ============================================================================

/**
 * Mouse Event Handler Type
 * 
 * Type definition for mouse event handling functions.
 * 
 * @example
 * ```typescript
 * const handleClick: MouseEventHandler = (event) => {
 *   console.log('Mouse clicked at', event.clientX, event.clientY);
 * };
 * ```
 */
export type MouseEventHandler = (event: React.MouseEvent) => void

/**
 * Keyboard Event Handler Type
 * 
 * Type definition for keyboard event handling functions.
 * 
 * @example
 * ```typescript
 * const handleKeyPress: KeyboardEventHandler = (event) => {
 *   if (event.key === 'Enter') startTest();
 * };
 * ```
 */
export type KeyboardEventHandler = (event: React.KeyboardEvent) => void

/**
 * Change Event Handler Type
 * 
 * Type definition for input change event handling functions.
 * 
 * @example
 * ```typescript
 * const handleInputChange: ChangeEventHandler = (event) => {
 *   setInputValue(event.target.value);
 * };
 * ```
 */
export type ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

/**
 * Base Component Props Interface
 * 
 * Common props shared across multiple components.
 * Provides consistent styling and children support.
 * 
 * @interface BaseComponentProps
 * @example
 * ```typescript
 * interface MyComponentProps extends BaseComponentProps {
 *   title: string;
 *   onAction: () => void;
 * }
 * ```
 */
export interface BaseComponentProps {
  /** Additional CSS classes for styling */
  className?: string
  /** Child elements to render */
  children?: React.ReactNode
}

// ============================================================================
// API & STORAGE TYPES
// ============================================================================

/**
 * API Response Interface
 * 
 * Standard structure for API responses throughout the application.
 * Provides consistent error handling and data access patterns.
 * 
 * @template T - The response data type
 * @interface ApiResponse
 * @example
 * ```typescript
 * const response: ApiResponse<CpsTestResult> = await submitCpsTest(data);
 * if (response.success) {
 *   console.log('Test saved:', response.data);
 * } else {
 *   console.error('Error:', response.error);
 * }
 * ```
 */
export interface ApiResponse<T> {
  /** Whether the request was successful */
  success: boolean
  /** Response data when successful */
  data: T
  /** Success message */
  message?: string
  /** Error message when request fails */
  error?: string
}

/**
 * Local Storage Data Interface
 * 
 * Structure for data stored in browser's localStorage.
 * Maintains user preferences and test history locally.
 * 
 * @interface LocalStorageData
 * @example
 * ```typescript
 * const storageData: LocalStorageData = {
 *   testHistory: [cpsResult1, dpiResult1],
 *   userPreferences: {
 *     defaultTestDuration: 10,
 *     showTutorials: false
 *   }
 * };
 * ```
 */
export interface LocalStorageData {
  /** Array of completed test results */
  testHistory: TestResult[]
  /** User configuration and preferences */
  userPreferences: Record<string, any>
}

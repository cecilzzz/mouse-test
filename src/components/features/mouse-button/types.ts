/**
 * Mouse Button Test Component Types
 * 
 * Type definitions specific to the mouse button testing functionality.
 * These types are colocated with the component for better maintainability.
 */

/**
 * 鼠標按鈕狀態接口
 * 追蹤每個鼠標按鈕的實時按下/彈起狀態
 */
export interface MouseButtonState {
  left: boolean
  right: boolean  
  middle: boolean
  back: boolean
  forward: boolean
}

/**
 * 點擊計數接口
 * 追蹤每個鼠標按鈕的累計點擊次數
 */
export interface ClickCount {
  left: number
  right: number
  middle: number
  back: number
  forward: number
}

/**
 * 鼠標按鈕統計數據接口
 * 組件對外提供的統計信息結構
 */
export interface MouseButtonStats {
  totalClicks: number
  buttonCounts: ClickCount
  activeButtons: MouseButtonState
}

/**
 * 組件屬性接口
 * MouseButtonTestCore 組件的 props 定義
 */
export interface MouseButtonTestCoreProps {
  onStatsChange?: (stats: MouseButtonStats) => void
  onError?: (error: string | null) => void
  className?: string
}

/**
 * 按鈕名稱聯合類型
 * 支援的鼠標按鈕名稱
 */
export type MouseButtonName = keyof MouseButtonState
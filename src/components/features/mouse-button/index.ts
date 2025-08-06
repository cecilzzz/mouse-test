/**
 * Mouse Button Test Feature - 統一導出
 * 
 * 此文件提供mouse-button feature的所有公開API的統一導出點
 * 遵循現代React組件的模塊化設計原則
 */

// 主組件導出
export { default as MouseButtonTestCore } from './MouseButtonTestCore'

// 類型定義導出
export type {
  MouseButtonState,
  ClickCount,
  MouseButtonStats,
  MouseButtonTestCoreProps,
  MouseButtonName
} from './types'

// 注意：樣式文件會在組件內部自動導入，無需單獨導出
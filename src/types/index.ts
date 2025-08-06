/**
 * Mouse Test Application Types
 * 
 * 🎯 這個文件的工作：
 * 定義整個滑鼠測試應用需要用到的所有資料類型
 * 
 * 🚫 這個文件不包含什麼：
 * - React內建的類型（如React.FC、JSX.Element等）
 * - 第三方套件的類型（由套件本身提供）
 * - 過度複雜的類型抽象（保持簡單明確）
 * 
 * ✅ 只包含：
 * - 應用特定的介面定義
 * - FAQ系統的資料結構
 * - 測試結果的資料格式
 * - 本地儲存的資料結構
 * 
 * 💡 比喻：就像是建築設計圖，定義每個房間的用途和規格，
 *     但不包含水泥、磚塊等基礎建材的規格（那些有標準規範）
 */

// 🎨 UI組件類型定義
export interface TestTool {
  href: string                                           // 🔗 連結網址
  icon: React.ComponentType<{ className?: string }>     // 🖼️ 圖示組件
  title: string                                          // 📝 標題文字
  description: string                                    // 📄 描述內容
  gradient: string                                       // 🌈 背景漸變樣式
  border: string                                         // 🔲 邊框樣式
  iconColor: string                                      // 🎨 圖示顏色
  titleColor: string                                     // 🏷️ 標題顏色
  borderColor: string                                    // 🖌️ 邊框顏色
}

// 📋 FAQ系統類型定義
export type FaqCategory = 
  | 'basic'           // 基礎問題
  | 'button'          // 按鈕相關
  | 'cps'             // CPS測試相關
  | 'dpi'             // DPI設定相關
  | 'performance'     // 效能相關
  | 'troubleshooting' // 故障排除
  | 'accuracy'        // 準確度相關
  | 'scroll'          // 滾輪相關
  | 'compatibility'   // 相容性問題
  | 'gaming'          // 遊戲相關

export interface FaqItem {
  question: string    // ❓ 問題內容
  answer: string      // ✅ 答案內容（支援HTML格式）
  category: FaqCategory // 🏷️ 分類標籤（用於組織，不影響顯示顏色）
}


// 📊 測試結果類型定義
export interface TestResult {
  timestamp: Date                      // ⏰ 測試時間戳記
  testType: string                     // 🏷️ 測試類型（如：'cps-5s', 'button-test'）
  score: number                        // 🎯 測試分數
  details?: Record<string, unknown>    // 📋 額外詳細資料（可選）
}

export interface DpiTestResult {
  dpi: number           // 🖱️ 滑鼠DPI值
  pixelsPerInch: number // 📏 每英寸像素數
  accuracy: number      // 🎯 準確度百分比
  timestamp: Date       // ⏰ 測試時間
}

// 💾 本地儲存資料結構
export interface LocalStorageData {
  testHistory: TestResult[]                // 📈 測試歷史記錄陣列
  userPreferences: Record<string, unknown> // ⚙️ 用戶偏好設定（靈活結構）
}
# MouseButtonTestCore 組件文檔

## 組件概述

MouseButtonTestCore 是一個專為遊戲玩家和技術愛好者設計的鼠標按鈕診斷工具。採用賽博朋克/駭客美學風格，提供實時的鼠標按鈕狀態反饋和點擊計數功能。

## 核心功能

### 支援的鼠標按鈕
- **左鍵** (Left Button) - event.button = 0
- **右鍵** (Right Button) - event.button = 2  
- **中鍵** (Middle Button) - event.button = 1
- **後退鍵** (Back Button) - event.button = 3
- **前進鍵** (Forward Button) - event.button = 4

### 視覺反饋系統
- **實時高亮**: 按下按鈕時立即顯示霓虹綠高亮效果
- **狀態同步**: 按鈕區域和數字徽章同步變色
- **計數追蹤**: 每次點擊自動增加對應按鈕的計數
- **活動指示器**: 任何按鈕激活時顯示 RGB 循環光效

## 技術架構

### 狀態管理
```typescript
// 按鈕點擊計數
const [clickCounts, setClickCounts] = useState<ClickCount>({
  left: 0, right: 0, middle: 0, back: 0, forward: 0
})

// 按鈕實時按下狀態  
const [activeButtons, setActiveButtons] = useState<MouseButtonState>({
  left: false, right: false, middle: false, back: false, forward: false
})
```

### 事件處理邏輯

#### 容器級別事件綁定
組件使用容器級別的事件處理，確保在測試區域內任何位置的點擊都能被正確捕獲：

```typescript
<div 
  onMouseDown={handleMouseDown}
  onMouseUp={handleMouseUp}
  onContextMenu={handleContextMenu}
  onAuxClick={handleAuxClick}
>
```

#### 事件處理函數
- **handleMouseDown**: 設置按鈕為激活狀態 + 增加計數
- **handleMouseUp**: 取消按鈕激活狀態
- **handleContextMenu**: 阻止右鍵選單（劫持右鍵）
- **handleAuxClick**: 處理中鍵和其他輔助按鈕點擊

### 按鈕映射系統
```typescript
const getButtonName = (button: number): keyof MouseButtonState => {
  switch (button) {
    case 0: return 'left'
    case 1: return 'middle' 
    case 2: return 'right'
    case 3: return 'back'
    case 4: return 'forward'
    default: return 'left'
  }
}
```

## CSS 樣式系統

### 按鈕狀態樣式
```css
.mouse-button-active {
  @apply bg-neon-green-500 border-neon-green-400 text-black;
  @apply shadow-lg shadow-neon-green-500/50;
}

.mouse-button-inactive {
  @apply bg-gray-800 dark:bg-gray-900 border-gray-600 dark:border-gray-700;
  @apply text-gray-300 dark:text-gray-400;
  @apply hover:border-electric-500 hover:text-electric-400;
}
```

### 事件穿透設計
所有子元素設置 `pointer-events: none`，確保鼠標事件直接穿透到容器處理：

```typescript
style={{ pointerEvents: 'none' }}
```

## Debug 歷程 (2025年8月)

### 第一輪問題：基礎事件處理
**問題**: 中鍵按鈕飄移，其他按鈕不工作
**原因**: 事件類型不匹配，使用了 `MouseEvent` 而非 `React.MouseEvent<HTMLDivElement>`
**解決**: 修正所有事件處理函數的參數類型

### 第二輪問題：位置依賴性
**問題**: 組件響應與光標位置相關，存在三種不同行為
1. 光標在數字內：正常工作（期望行為）
2. 光標在按鈕區域但數字外：數字保持黑色
3. 光標在區域外：緩慢閃爍，無動畫

**根本原因**: 子元素攔截了鼠標事件，導致不一致的事件冒泡行為
**解決**: 為所有子元素添加 `pointer-events: none`

### 第三輪問題：不需要的動畫效果
**問題**: 按鈕激活時出現緩慢閃爍（pulse動畫）
**原因**: CSS 中 `.mouse-button-active` 包含 `@apply animate-pulse`
**解決**: 移除 pulse 動畫，保持穩定高亮

### 第四輪問題：Badge 顏色問題
**問題**: 按鈕區域高亮但數字區域仍為黑色
**原因**: Badge 組件有固定的 `bg-black` 樣式，覆蓋了 variant 的背景色
**解決**: 移除固定黑色背景，讓 variant 屬性正常工作

## 使用指南

### 基本用法

#### 方式一：使用統一導出（推薦）
```typescript
import { MouseButtonTestCore } from '@/components/features/mouse-button'
import type { MouseButtonStats } from '@/components/features/mouse-button'

<MouseButtonTestCore 
  onStatsChange={(stats: MouseButtonStats) => console.log(stats)}
  onError={(error) => console.error(error)}
/>
```

#### 方式二：直接導入組件
```typescript
import MouseButtonTestCore from '@/components/features/mouse-button/MouseButtonTestCore'

<MouseButtonTestCore 
  onStatsChange={(stats) => console.log(stats)}
  onError={(error) => console.error(error)}
/>
```

### Props 接口
```typescript
interface MouseButtonTestCoreProps {
  onStatsChange?: (stats: MouseButtonStats) => void
  onError?: (error: string | null) => void  
  className?: string
}

interface MouseButtonStats {
  totalClicks: number
  buttonCounts: ClickCount
  activeButtons: MouseButtonState
}
```

## 設計原則

### 用戶體驗
- **即時反饋**: 按下按鈕立即顯示視覺反應
- **清晰指示**: 不同按鈕狀態有明確的視覺區別
- **無干擾**: 不顯示右鍵劫持等技術細節警告

### 技術設計
- **事件統一**: 所有鼠標事件統一在容器層面處理
- **狀態同步**: 視覺狀態與邏輯狀態完全同步
- **性能優化**: 使用 useCallback 避免不必要的重新渲染

### 視覺設計
- **賽博朋克風格**: 霓虹綠、電光藍、賽博粉的配色方案
- **遊戲化界面**: 終端風格文字和LED效果
- **響應式布局**: 適配桌面和移動端使用

## 維護注意事項

1. **不要移除 pointer-events: none**: 這是確保事件處理一致性的關鍵
2. **不要添加 transition 動畫**: 會導致閃爍效果
3. **保持 Badge variant 邏輯**: 確保數字區域和按鈕區域顏色同步
4. **測試所有按鈕**: 包括不常用的後退/前進鍵

## 文件結構

遵循現代React最佳實踐，所有相關文件都集中在同一個feature目錄下：

```
src/components/features/mouse-button/
├── MouseButtonTestCore.tsx    # 主組件實現
├── types.ts                   # 專用類型定義
├── styles.css                 # 專用樣式定義
├── index.ts                   # 統一導出文件
└── README.md                  # 此文檔
```

### 文件說明

- **`MouseButtonTestCore.tsx`** - 核心組件實現，包含所有交互邏輯
- **`types.ts`** - 專用類型定義，包含MouseButtonState、ClickCount等接口
- **`styles.css`** - 專用樣式，包含.mouse-button-*系列CSS類和動畫
- **`index.ts`** - 統一導出點，提供乾淨的導入接口
- **`README.md`** - 完整的組件文檔和debug歷程

### 使用示例文件

- `src/app/page.tsx` - 主頁組件使用示例

## 架構重構記錄 (2025年8月)

### 重構原因
遵循現代React最佳實踐，實現功能模塊的高內聚、低耦合：
- **問題**: 樣式和類型定義散佈在全局文件中，難以維護
- **解決**: 採用feature-first組織方式，相關文件集中管理

### 重構內容
1. **類型定義遷移**: 從 `src/types/index.ts` 遷移到本地 `types.ts`
2. **樣式定義遷移**: 從 `src/app/globals.css` 遷移到本地 `styles.css`  
3. **組件更新**: 修改導入路徑，使用本地文件
4. **統一導出**: 創建 `index.ts` 提供乾淨的API接口

### 重構優勢
- ✅ **高內聚性**: 所有相關代碼都在同一目錄下
- ✅ **可移植性**: 整個feature可輕鬆遷移到其他項目
- ✅ **可維護性**: 修改功能只需關注一個目錄
- ✅ **可發現性**: 開發者能快速找到所有相關文件

## 開發者備註

此組件經過完整的debug過程和架構重構，所有已知問題都已解決。如需修改，請參考此文檔避免重現歷史問題。調試過程已記錄在項目memory系統中，可供後續參考。

**重要**: 此組件現在遵循feature-first組織原則，請保持這種結構，不要將樣式或類型重新分散到全局文件中。
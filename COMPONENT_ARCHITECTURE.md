# Mouse Test - 新組件架構文檔

## 概述

Mouse Test 項目已完成 UI 組件架構重構，實現了清晰的三層架構設計。新架構解決了組件職責混淆、佈局不統一、代碼重複等問題，為未來擴展新測試功能提供了穩固基礎。

## 架構設計原則

### 核心原則
1. **職責分離**: 佈局組件只管佈局，功能組件只管邏輯，共享組件提供通用功能
2. **統一性**: 所有測試頁面使用統一的佈局和組件
3. **可擴展性**: 新增測試類型只需幾分鐘，無需重寫佈局代碼
4. **可重用性**: 組件設計支持多場景重用

### 三層架構

```
Layout 層 (佈局組件) - 負責頁面結構和佈局
├── PageLayout              # 基礎頁面佈局
├── TestPageLayout          # 測試頁面專用佈局
└── ConfigurableHeroSection # 可配置 Hero 區域

Feature 層 (功能組件) - 負責核心測試邏輯
├── cps/CpsTestCore        # CPS 測試核心邏輯
├── mouse-button/MouseButtonTestCore  # 鼠標按鈕測試邏輯
├── performance/           # 性能測試組件 (待開發)
├── diagnostic/            # 硬件診斷測試 (待開發)
└── gaming/                # 游戲專用測試 (待開發)

Shared 層 (共享組件) - 提供通用功能和UI元素
├── TestStatsPanel        # 統一統計面板
├── QuickActionsPanel     # 統一快速操作面板
└── PageFaq               # FAQ 組件
```

## 組件詳細說明

### Layout 層組件

#### PageLayout
**用途**: 基礎頁面佈局，用於非測試頁面
**特點**: 簡單的 header + main + footer 結構

```tsx
<PageLayout>
  <ConfigurableHeroSection config={heroConfig} />
  <main>
    <TestGrid tests={allTests} />
    <NavigationSection />
  </main>
</PageLayout>
```

#### TestPageLayout
**用途**: 測試頁面專用佈局
**特點**: hero + 測試區域 + 側邊欄 + FAQ 的標準結構

```tsx
<TestPageLayout
  hero={<ConfigurableHeroSection config={heroConfig} />}
  testArea={<CpsTestCore {...props} />}
  sidebar={<><TestStatsPanel /><QuickActionsPanel /></>}
  faq={<PageFaq faqs={faqs} />}
/>
```

#### ConfigurableHeroSection
**用途**: 可配置的 Hero 區域，替代硬編碼的 HeroSection
**特點**: 支持自定義標題、圖標、徽章等

```tsx
const heroConfig = {
  title: "CPS TEST CENTER",
  subtitle: ">> Professional Click Speed Testing Suite",
  description: "Test your click speed...",
  icon: <Timer className="w-10 h-10 text-black" />,
  badges: [
    { icon: Target, text: "INSTANT RESULTS", color: "neon-green" }
  ]
}
```

### Feature 層組件

#### CpsTestCore
**用途**: 純 CPS 測試邏輯，不包含佈局
**特點**: 
- 通過 props 回調與外部通信
- 支持多種測試類型 (left/right/spacebar/mobile)
- 統一的測試狀態管理

```tsx
<CpsTestCore
  duration={5}
  testType="left"
  onStatsChange={handleStats}
  onError={handleError}
/>
```

#### MouseButtonTestCore
**用途**: 純鼠標按鈕測試邏輯
**特點**: 
- 實時按鈕狀態檢測
- 點擊計數統計
- 通過回調提供統計數據

### Shared 層組件

#### TestStatsPanel
**用途**: 統一的統計面板
**特點**: 
- 支持主要統計數據大號顯示
- 多種顏色變體
- 錯誤消息處理

```tsx
<TestStatsPanel
  title="LIVE STATS"
  mainStat={{ value: "12.5", label: "CURRENT CPS" }}
  stats={[
    { label: "CLICKS", value: 125, variant: "neon-green" },
    { label: "TIME LEFT", value: "8.3s", variant: "cyber-pink" }
  ]}
  error={error}
  onErrorDismiss={() => setError(null)}
/>
```

#### QuickActionsPanel
**用途**: 統一的快速操作面板
**特點**: 
- 支持內部和外部鏈接
- 多種按鈕樣式變體
- 圖標支持

```tsx
<QuickActionsPanel
  title="QUICK TESTS"
  actions={[
    { label: "1 SECOND >", href: "/cps/1-second", variant: "cyber" },
    { label: "RESET ALL", onClick: handleReset, variant: "warning" }
  ]}
/>
```

## 頁面類型和組合模式

### 1. Dashboard 頁面 (首頁)
```tsx
<PageLayout>
  <ConfigurableHeroSection config={heroConfig} />
  <main>
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <MouseButtonTestCore />
      </div>
      <div>
        <TestStatsPanel />
        <QuickActionsPanel />
      </div>
    </div>
    <NavigationSection />
    <PageFaq />
  </main>
</PageLayout>
```

### 2. Single Test 頁面 (如 CPS 5秒測試)
```tsx
<TestPageLayout
  hero={<ConfigurableHeroSection config={heroConfig} />}
  testArea={<CpsTestCore duration={5} />}
  sidebar={<><TestStatsPanel /><QuickActionsPanel /></>}
  faq={<PageFaq faqs={testFaqs} />}
/>
```

### 3. Test Suite 頁面 (如 CPS 中心)
```tsx
<TestPageLayout
  hero={<ConfigurableHeroSection config={heroConfig} />}
  testArea={<CpsTestCore duration={5} />}
  sidebar={<><TestStatsPanel /><QuickActionsPanel /></>}
>
  <TestVariantGrid variants={variants} />
  <PageFaq faqs={suiteFaqs} />
</TestPageLayout>
```

## 統一接口設計

### 測試組件標準接口
```tsx
interface TestComponentProps<TResult> {
  onResultChange?: (result: TResult) => void
  onStatusChange?: (status: TestStatus) => void
  onStatsChange?: (stats: TestStats) => void
  onError?: (error: string | null) => void
}

type TestStatus = 'idle' | 'ready' | 'running' | 'finished'
```

### 統計面板配置
```tsx
interface StatItem {
  label: string
  value: string | number
  variant?: 'neon-green' | 'electric' | 'cyber-pink' | 'warning-orange' | 'hacker-purple'
}
```

### 快速操作配置
```tsx
interface ActionItem {
  label: string
  href?: string
  onClick?: () => void
  icon?: LucideIcon
  variant?: 'default' | 'outline' | 'cyber' | 'warning' | 'purple'
}
```

## 開發工作流程

### 添加新測試類型 (3分鐘流程)

1. **創建測試核心組件** (1分鐘)
```tsx
// src/components/features/new-test/NewTestCore.tsx
const NewTestCore: React.FC<TestProps> = ({ onStatsChange, onError }) => {
  // 測試邏輯實現
  return <Card>/* 測試UI */</Card>
}
```

2. **創建頁面內容組件** (1分鐘)
```tsx
// src/components/pages/NewTestPageContent.tsx
'use client'
const NewTestPageContent = () => {
  const [stats, setStats] = useState({})
  
  return (
    <TestPageLayout
      hero={<ConfigurableHeroSection config={heroConfig} />}
      testArea={<NewTestCore onStatsChange={setStats} />}
      sidebar={<><TestStatsPanel /><QuickActionsPanel /></>}
    />
  )
}
```

3. **創建路由頁面** (1分鐘)
```tsx
// src/app/new-test/page.tsx
import { Metadata } from 'next'
import NewTestPageContent from '@/components/pages/NewTestPageContent'

export const metadata: Metadata = { /* SEO配置 */ }
export default function NewTestPage() {
  return <NewTestPageContent />
}
```

### 修改現有測試
- 只需修改對應的 Core 組件
- 佈局和統計面板自動保持一致

### 添加新的統一功能
- 在 Shared 層添加新組件
- 所有測試頁面自動獲得新功能

## 最佳實踐

### 組件設計原則
1. **單一職責**: 每個組件只負責一件事
2. **props 接口**: 使用明確的 TypeScript 接口
3. **錯誤處理**: 所有組件都要有錯誤邊界
4. **性能優化**: 使用 useCallback、useMemo 優化性能

### 樣式規範
1. **統一配色**: 使用定義好的 cyberpunk 色彩變體
2. **統一字體**: 使用 JetBrains Mono 保持技術感
3. **統一間距**: 遵循 Tailwind 間距系統
4. **響應式**: 所有組件都要支持移動端

### 文件組織
```
src/components/
├── layout/          # 佈局組件
├── features/        # 功能組件（按測試類型分組）
├── shared/          # 共享組件
├── pages/           # 頁面內容組件（client components）
└── ui/              # 基礎 UI 組件
```

## 遷移指南

### 從舊架構遷移到新架構
1. 確定頁面類型 (Dashboard/Single Test/Test Suite)
2. 選擇對應的佈局模板
3. 重構測試組件為純邏輯組件
4. 配置統計面板和快速操作
5. 測試功能完整性

### 向後兼容性
- 舊的組件仍然可用，但建議逐步遷移
- 新功能只在新架構上開發
- 逐步棄用舊組件

## 未來擴展計劃

基於新架構，可以快速實現：

### 性能測試區域 (/performance)
- DPI 測試組件
- 鼠標 Hz (輪詢率) 測試
- 延遲測試組件
- 鼠標精度測試

### 硬件診斷區域 (/diagnostic)  
- 滾輪測試組件
- 雙擊測試組件
- 無線鼠標測試

### 游戲專用測試 (/gaming)
- Jitter Click 測試
- Butterfly Click 測試
- Minecraft CPS 專用測試
- 瞄準精度測試

每個新測試類型只需按照標準流程創建，無需重新設計佈局和統計系統。

## 總結

新的三層組件架構成功解決了原有的技術債務，建立了可擴展、一致、高效的開發體系。通過職責分離和統一接口，現在添加新功能變得非常簡單，同時保證了整體的設計一致性和用戶體驗的統一性。

這個架構將支持 Mouse Test 項目未來的快速發展，無論是添加新的測試類型還是擴展現有功能，都可以在新架構基礎上高效完成。
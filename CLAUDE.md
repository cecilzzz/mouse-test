# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mouse Test is a gaming-focused mouse testing web application built with Next.js 14. It provides comprehensive mouse diagnostics including CPS (Clicks Per Second) testing, button functionality testing, and performance analysis. The app targets gamers, competitive esports players, and tech enthusiasts with a cyberpunk/hacker aesthetic.

## Development Commands

### Core Commands
```bash
# Development server (uses Next.js dev server)
npm run dev
# or
pnpm dev

# Production build
npm run build
pnpm build

# Start production server
npm run start
pnpm start

# Linting (ESLint with Next.js config)
npm run lint
pnpm lint
```

### Notes
- Project uses pnpm (evident from pnpm-lock.yaml)
- No custom test scripts configured
- No TypeScript check script configured

## Tech Stack & Architecture

### Core Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom cyberpunk/gaming theme
- **UI Components**: Custom components built with Radix UI primitives
- **State Management**: React hooks (useState, useCallback, useRef)
- **Storage**: localStorage for test results and best scores

### Three-Layer Component Architecture

The project follows a clean three-layer architecture for maximum maintainability and scalability:

```
Layout 層 (佈局組件) - 負責頁面結構和佈局
├── PageLayout              # 基礎頁面佈局
├── TestPageLayout          # 測試頁面專用佈局
└── ConfigurableHeroSection # 可配置 Hero 區域

Feature 層 (功能組件) - 負責核心測試邏輯
├── cps/                    # CPS 測試核心邏輯
├── mouse-button/           # 鼠標按鈕測試邏輯
├── double-click/           # 雙擊測試邏輯
├── scroll/                 # 滾輪測試邏輯
└── gaming/                 # 游戲專用測試

Shared 層 (共享組件) - 提供通用功能和UI元素
├── TestStatsPanel          # 統一統計面板
├── QuickActionsPanel       # 統一快速操作面板
└── PageFaq                 # FAQ 組件
```

**Core Architecture Principles:**
1. **職責分離**: Layout handles structure, Features handle logic, Shared provides common functionality
2. **統一性**: All test pages use unified layouts and components
3. **可擴展性**: Adding new test types takes only 3 minutes with standard templates
4. **可重用性**: Components designed for multi-scenario reuse

## Design System - Cyberpunk Gaming Aesthetic

### Color Palette
The app uses a **cyberpunk/gaming aesthetic** with these core colors:

- **Neon Green** (`#00ff41`) - Matrix green, primary color
- **Electric Blue** (`#00bfff`) - Tech blue, secondary color  
- **Cyber Pink** (`#ff0080`) - Cyberpunk pink, accent color
- **Warning Orange** (`#ff6600`) - Warning states
- **Hacker Purple** (`#8a2be2`) - Special elements
- **Deep Black** (`#000000`) - Background (6% brightness)

### Visual Characteristics
- **Typography**: ALL CAPS titles, JetBrains Mono monospace fonts
- **Borders**: 2px solid borders with sharp corners (0.5rem radius)
- **Effects**: Neon glow effects with box-shadow, RGB cycling animations
- **Prefixes**: Terminal-style prefixes (`>>`, `>`, `<<`)
- **Animations**: Pulse effects, hover scaling, RGB LED cycles

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── cps/               # CPS test variants (1s, 5s, 10s, 100s, mobile, etc.)
│   ├── gaming/            # Gaming-specific tests (butterfly, jitter, minecraft)
│   ├── button-test/       # Mouse button functionality test
│   ├── double-click-test/ # Double-click test
│   ├── scroll-test/       # Mouse scroll wheel test
│   ├── layout.tsx         # Root layout with SEO metadata
│   └── page.tsx           # Homepage with mouse button test
├── components/
│   ├── features/          # Feature-specific components (colocation architecture)
│   │   ├── cps/           # CPS testing components
│   │   │   ├── CpsTestCore.tsx     # Main CPS test logic
│   │   │   ├── faq/               # CPS-specific FAQ data
│   │   │   ├── hooks/             # CPS-related hooks
│   │   │   ├── styles.css         # CPS-specific styles
│   │   │   └── types.ts           # CPS-specific types
│   │   ├── mouse-button/  # Mouse button test components
│   │   ├── double-click/  # Double-click test components
│   │   ├── scroll/        # Scroll test components
│   │   ├── gaming/        # Gaming-specific test components
│   │   └── [REMOVED - MouseTestFaq.tsx was dead code]
│   ├── layout/            # Layout components
│   │   ├── Header.tsx             # Unified navigation header
│   │   ├── Footer.tsx             # Site footer
│   │   ├── PageLayout.tsx         # Basic page layout
│   │   ├── TestPageLayout.tsx     # Test page layout wrapper
│   │   └── ConfigurableHeroSection.tsx # Configurable hero section
│   ├── seo/              # SEO components (structured data)
│   ├── shared/           # Reusable components
│   │   ├── TestStatsPanel.tsx     # Unified statistics panel
│   │   ├── QuickActionsPanel.tsx  # Unified quick actions panel
│   │   ├── PageFaq.tsx            # FAQ component (backward compatible)
│   │   ├── FaqWithSeo.tsx         # FAQ with SEO integration
│   │   ├── FaqDisplay.tsx         # Pure UI FAQ display
│   │   └── ErrorBoundary.tsx      # Error boundary wrapper
│   └── ui/               # Base UI components (Button, Card, Badge)
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and helpers
├── types/               # TypeScript type definitions
└── utils/               # Additional utilities
```

### Feature-First Colocation Architecture

Each feature follows the colocation pattern with complete self-containment:

```
src/components/features/[feature-name]/
├── [FeatureName]Core.tsx  # Main logic component
├── index.ts               # Barrel exports
├── styles.css             # Feature-specific styles
├── types.ts               # Feature-specific types
├── hooks/                 # Feature-specific hooks (if needed)
├── faq/                   # Feature-specific FAQ data (if needed)
└── README.md              # Feature documentation (if complex)
```

## 代碼注釋規範指南

> **CRITICAL REQUIREMENT**: 專為編程能力有限的開發者設計的繁體中文注釋標準

### 核心原則

#### 1. 使用繁體中文注釋
- **所有注釋必須使用繁體中文**
- 技術術語可保留英文，但需要中文解釋
- 變數名和函數名保持英文，但要有中文說明

#### 2. 用生活化比喻解釋概念
- 複雜概念用日常生活的比喻來解釋
- 避免過於技術性的術語
- 讓非程序員也能理解代碼在做什麼

### 注釋格式規範

#### 組件頂部注釋格式
```tsx
/**
 * ComponentName 組件 - 簡短描述
 * 
 * 🎯 這個組件的工作：
 * 用一句話說明這個組件是做什麼的
 * 
 * 🚫 這個組件不做什麼：
 * - 不處理XXX（說明職責邊界）
 * - 不處理YYY（避免混淆）
 * 
 * ✅ 只負責：
 * - 具體職責1
 * - 具體職責2
 * 
 * 💡 比喻：就像是XXX，負責YYY，
 *     不負責ZZZ
 */
```

#### 函數/方法注釋格式
```tsx
// 🔧 【功能名稱】簡短描述
const functionName = () => {
  // 💡 這裡解釋這個函數在做什麼，為什麼需要這樣做
}
```

#### 複雜邏輯注釋格式
```tsx
// 🔄 【工作步驟】數據處理：說明這段代碼的目的
const processedData = useMemo(() => {
  // 📦 這裡我們對數據進行「包裝」
  return data.map(item => ({
    ...item,  // 保留原本的內容
    newField: calculateSomething(item)  // 🎨 新增：計算後的結果
  }))
  
  // 💡 舉例轉換過程：
  // 輸入：{ name: "測試", type: "basic" }
  // 輸出：{ name: "測試", type: "basic", color: "green" }
  
}, [data])
```

#### 條件判斷注釋格式
```tsx
// 🚦 判斷邏輯：檢查用戶是否已登入
if (user?.isLoggedIn) {
  // ✅ 已登入：顯示用戶專屬內容
  return <UserDashboard />
} else {
  // ❌ 未登入：導向登入頁面
  return <LoginPage />
}
```

### 特殊情況注釋規範

#### 1. 技術概念解釋
當遇到技術概念時，必須提供中文解釋：

```tsx
// 🌈 這就是gradient！一條彩色的橫線，顯示這個FAQ的分類顏色
<div className={`bg-gradient-to-r ${faq.gradient}`} />
{/* 
  💡 gradient是什麼？
  - gradient = 漸變色，就是從一個顏色慢慢變到另一個顏色
  - 比如：from-electric-500 to-cyber-pink-500 = 從藍色漸變到粉紅色
*/}
```

#### 2. 數據流動說明
解釋數據如何在組件間傳遞：

```tsx
return (
  <>
    {/* 🔍 SEO處理：交給專業的FaqSchema組件 */}
    <FaqSchema faqs={faqs} />
    {/* 
      📝 這裡傳入原始的faqs（沒有gradient），因為Google不需要知道顏色，
          只需要知道問題和答案的內容就好
    */}
    
    {/* 🎨 UI顯示：交給專業的FaqDisplay組件 */}
    <FaqDisplay faqs={processedFaqs} />
    {/* 
      📝 這裡傳入processedFaqs（有gradient），因為UI需要知道每個分類要顯示什麼顏色
    */}
  </>
)
```

#### 3. 狀態管理說明
```tsx
// 📊 狀態管理：追蹤測試進度
const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'finished'>('idle')
// 💡 idle = 還沒開始, running = 正在測試, finished = 測試完成

const [results, setResults] = useState<TestResult[]>([])
// 📈 存儲所有測試結果，每次測試完成都會新增一筆記錄
```

### 表情符號使用規範

#### 常用表情符號含義
- 🎯 = 主要功能/目標
- 🚫 = 不做什麼/邊界
- ✅ = 負責的職責
- 💡 = 解釋/比喻
- 🔧 = 工具函數
- 🔄 = 數據處理
- 📦 = 數據包裝
- 🎨 = UI相關
- 🔍 = SEO相關
- 📊 = 狀態管理
- 📈 = 數據分析
- 🚦 = 條件判斷
- 🌈 = 視覺效果
- 📝 = 說明註解
- ⚡ = 性能相關
- 🛡️ = 錯誤處理
- 📱 = 行動裝置相關

### 實際範例

#### 好的注釋範例
```tsx
/**
 * CpsTestCore 組件 - CPS測試核心引擎
 * 
 * 🎯 這個組件的工作：
 * 計算用戶在指定時間內能點擊多少次滑鼠，就像計時器+計數器的組合
 * 
 * 🚫 這個組件不做什麼：
 * - 不處理UI外觀（由父組件決定）
 * - 不處理分數保存（由父組件處理）
 * - 不處理頁面導航（專心測試）
 * 
 * ✅ 只負責：
 * - 計時功能（倒數計時）
 * - 點擊計數（記錄點擊次數）
 * - CPS計算（每秒點擊數）
 * - 測試狀態管理（準備→進行中→完成）
 * 
 * 💡 比喻：就像體育測驗的碼錶+計數器，
 *     只管計時和計數，不管獎牌頒發
 */
const CpsTestCore: React.FC<CpsTestProps> = ({ duration, onResultChange }) => {
  // 📊 測試狀態：追蹤目前是在準備、測試中還是已完成
  const [status, setStatus] = useState<TestStatus>('idle')
  // 💡 idle=等待開始, ready=準備中, running=測試中, finished=完成
  
  // ⏰ 時間管理：倒數計時器
  const [timeLeft, setTimeLeft] = useState(duration)
  // 📈 點擊統計：記錄用戶點了幾次
  const [clickCount, setClickCount] = useState(0)
  
  // 🔧 【核心功能】開始測試
  const startTest = useCallback(() => {
    // 🚦 檢查是否已經在測試中，避免重複啟動
    if (status === 'running') return
    
    // 🎬 初始化測試環境
    setStatus('running')  // 設定狀態為測試中
    setClickCount(0)      // 重置點擊次數
    setTimeLeft(duration) // 重置倒數時間
    
    // ⏱️ 啟動倒數計時器
    // 💡 這就像運動會的發令槍，一響就開始計時
    startTimer()
  }, [status, duration])
  
  // 🔧 【計時邏輯】每秒減少1秒，時間到就停止測試
  const startTimer = useCallback(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // ⏰ 時間到！停止測試
          clearInterval(interval)
          setStatus('finished')
          // 📊 計算最終CPS並通知父組件
          const finalCps = clickCount / duration
          onResultChange?.({ cps: finalCps, clicks: clickCount })
          return 0
        }
        return prev - 1
      })
    }, 1000) // 每1000毫秒（1秒）執行一次
  }, [clickCount, duration, onResultChange])
}
```

### 避免的注釋方式

#### ❌ 不好的注釋
```tsx
// increment counter
setCount(count + 1)

// check if valid
if (data.isValid) {
  // process data
  processData(data)
}
```

#### ✅ 好的注釋
```tsx
// 📈 增加點擊計數：每次用戶點擊就+1
setCount(count + 1)

// 🚦 資料驗證：確保資料格式正確才處理
if (data.isValid) {
  // 🔄 資料處理：轉換成系統需要的格式
  processData(data)
}
```

### 注釋更新原則

1. **代碼修改時必須同步更新注釋**
2. **新增功能必須添加相應注釋**
3. **重構時要檢查注釋是否仍然準確**
4. **刪除代碼時要一併刪除相關注釋**

### 檢查清單

在提交代碼前，確保：
- [ ] 所有組件都有頂部說明注釋
- [ ] 複雜邏輯都有步驟說明
- [ ] 技術術語都有中文解釋
- [ ] 使用了適當的表情符號
- [ ] 注釋解釋了「為什麼」而不只是「什麼」
- [ ] 包含生活化比喻幫助理解

**記住：好的注釋讓代碼像故事書一樣容易閱讀！**

## Development Guidelines

### Layout Standardization
- **ALL pages must use unified layout components** - never create custom headers
- Use `PageLayout` for basic content pages
- Use `TestPageLayout` for complex test pages with sidebars and multiple sections
- Both layouts include the unified `Header` component with navigation
- Consistent header ensures proper navigation experience across all pages

### Component Development Standards

#### Test Component Interface
```tsx
interface TestComponentProps<TResult> {
  onResultChange?: (result: TResult) => void
  onStatusChange?: (status: TestStatus) => void
  onStatsChange?: (stats: TestStats) => void
  onError?: (error: string | null) => void
}

type TestStatus = 'idle' | 'ready' | 'running' | 'finished'
```

#### Adding New Test Types (3-Minute Workflow)

1. **Create Feature Component** (1 minute)
```tsx
// src/components/features/new-test/NewTestCore.tsx
const NewTestCore: React.FC<TestProps> = ({ onStatsChange, onError }) => {
  // Test logic implementation
  return <Card>/* Test UI */</Card>
}
```

2. **Create Page** (1 minute)
```tsx
// src/app/new-test/page.tsx
import TestPageLayout from '@/components/layout/TestPageLayout'
import NewTestCore from '@/components/features/new-test/NewTestCore'

export default function NewTestPage() {
  return (
    <TestPageLayout
      hero={<ConfigurableHeroSection config={heroConfig} />}
      testArea={<NewTestCore />}
      sidebar={<><TestStatsPanel /><QuickActionsPanel /></>}
      faq={<PageFaq faqs={testFaqs} />}
    />
  )
}
```

3. **Add Navigation** (1 minute)
Update NavigationSection component and relevant quick action panels.

### Styling Conventions
- Use custom Tailwind color palette (neon-green, electric, cyber-pink, etc.)
- Follow cyberpunk/terminal aesthetic (monospace fonts, terminal prefixes)
- Implement responsive design with mobile-first approach
- Use CSS animations for gaming/tech feel with RGB cycling and glow effects

### Performance & Type Safety
- CPS tests use precise timing with 100ms intervals
- Event handlers optimized with useCallback
- Strict TypeScript configuration with custom type definitions
- localStorage operations wrapped in try-catch with proper error handling

### SEO Strategy
- Rich metadata in layout.tsx
- Structured data (FAQ schema) in seo/ components
- SEO helper constants in lib/seo-helpers.ts
- Content-rich FAQ sections for long-tail keywords
- Internal linking strategy between different test types

## Key Features

1. **Multi-platform CPS Testing**: 1s, 5s, 10s, 100s variants + mobile/spacebar tests
2. **Mouse Button Testing**: Interactive visual button tester with real-time feedback
3. **Gaming-Specific Tests**: Jitter click, butterfly click, Minecraft CPS optimization
4. **Performance Tracking**: localStorage-based score history and analytics
5. **Mobile Support**: Touch-friendly interfaces and mobile-specific test variants
6. **Cyberpunk Design**: Gaming-focused aesthetic with RGB effects and neon styling

## Common Development Tasks

### Modifying Existing Tests
- Only modify the corresponding Core component in features/
- Layout and statistics panels automatically remain consistent
- Follow existing error handling and localStorage patterns

### Adding Unified Features
- Add new components to the Shared layer
- All test pages automatically inherit new functionality
- Maintain consistency with cyberpunk design system

### SEO Content Updates
1. Modify constants in `src/lib/seo-helpers.ts`
2. Update FAQ arrays in relevant feature directories
3. Ensure structured data compliance
4. Test internal linking structure

## Recent Updates

### Feature-First Colocation Architecture (August 2025)
- **Standardized**: All features now follow colocation pattern with complete self-containment
- **Enhanced maintainability**: Each feature contains its own components, styles, types, and logic
- **Improved discoverability**: Related code is grouped together for easier navigation
- **Better separation of concerns**: Clear boundaries between features and shared functionality

### Layout Unification (August 2025)  
- **Fixed**: All pages now use unified layout components
- **Before**: Inconsistent headers and navigation across pages
- **After**: Consistent navigation experience with unified Header component
- **Impact**: Better UX and SEO with proper internal linking structure

This Mouse Test application is designed to be the definitive gaming-focused mouse testing tool with a unique cyberpunk aesthetic that appeals to gamers, competitive players, and tech enthusiasts.
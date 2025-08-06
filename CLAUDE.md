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
│   │   └── MouseTestFaq.tsx       # General FAQ component
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
│   │   ├── PageFaq.tsx            # FAQ display component
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
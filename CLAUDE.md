# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mouse Test is a gaming-focused mouse testing web application built with Next.js 14. It provides comprehensive mouse diagnostics including CPS (Clicks Per Second) testing, button functionality testing, DPI measurement, and performance analysis. The app targets gamers, competitive esports players, and tech enthusiasts with a cyberpunk/hacker aesthetic.

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

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom cyberpunk/gaming theme
- **UI Components**: Custom components built with Radix UI primitives
- **State Management**: React hooks (useState, useCallback, useRef)
- **Storage**: localStorage for test results and best scores

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── cps/               # CPS test variants (1s, 5s, 10s, 100s, mobile, etc.)
│   ├── layout.tsx         # Root layout with SEO metadata
│   └── page.tsx           # Homepage with mouse button test
├── components/
│   ├── features/          # Feature-specific components
│   │   ├── MouseButtonTest.tsx    # Interactive mouse button tester
│   │   ├── MouseTestFaq.tsx       # FAQ component
│   │   └── cps/                   # CPS testing components
│   │       ├── CpsTest.tsx        # Main CPS test component
│   │       ├── CpsTestSimplified.tsx
│   │       ├── faq/               # CPS-specific FAQ data
│   │       └── hooks/             # CPS-related hooks
│   ├── layout/            # Layout components (Header, Footer, Navigation)
│   │   ├── Header.tsx             # Unified navigation header
│   │   ├── Footer.tsx             # Site footer
│   │   ├── SimplePageLayout.tsx   # Standard page layout wrapper
│   │   └── TestPageLayout.tsx     # Complex test page layout wrapper
│   ├── seo/              # SEO components (structured data)
│   ├── shared/           # Reusable components
│   └── ui/               # Base UI components (Button, Card, Badge)
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and helpers
│   ├── seo-helpers.ts    # SEO constants and helpers
│   └── utils.ts          # General utilities (cn function)
├── types/               # TypeScript type definitions
└── utils/               # Additional utilities
```

### Design System

The app uses a custom **cyberpunk/gaming aesthetic** with:

**Color Palette:**
- Neon Green (`#00ff41`) - Primary/Matrix green
- Electric Blue (`#00bfff`) - Secondary/Tech blue  
- Cyber Pink (`#ff0080`) - Accent/Cyberpunk pink
- Warning Orange (`#ff6600`) - Warning states
- Hacker Purple (`#8a2be2`) - Special elements
- RGB colors for LED effects

**Key Visual Elements:**
- Black backgrounds with neon borders
- Monospace fonts (JetBrains Mono)
- Terminal-style prefixes (`>>`, `>`, `<<`)
- ALL CAPS titles with bold weights
- Corner decorations for sci-fi look
- Glowing effects with box-shadow
- RGB cycling animations

### Core Components

#### CpsTest Component (`src/components/features/cps/CpsTest.tsx`)
- Supports multiple test types: left-click, right-click, spacebar, mobile tap
- Real-time click counting with precise timing
- Countdown mechanism (3-2-1) before test starts
- localStorage integration for best scores and history
- Safe localStorage handling with error boundaries
- Different test durations (1s, 5s, 10s, 100s)

#### MouseButtonTest Component
- Interactive mouse button testing
- Visual feedback for all mouse buttons (left, right, middle, back, forward)
- Real-time button state visualization

### State Management Patterns

- **Local state**: useState for component-level state
- **Performance optimization**: useCallback, useMemo for expensive operations
- **Refs**: useRef for timers, intervals, and DOM references
- **localStorage**: Custom hooks for persistent storage with error handling

### SEO Strategy

The app has comprehensive SEO optimization:
- Rich metadata in layout.tsx
- Structured data (FAQ schema)
- SEO helper constants in lib/seo-helpers.ts
- Content-rich FAQ sections for long-tail keywords
- Internal linking strategy between different test types

### Key Features

1. **Multi-platform CPS Testing**: 1s, 5s, 10s, 100s variants + mobile/spacebar tests
2. **Mouse Button Testing**: Interactive visual button tester
3. **Performance Tracking**: localStorage-based score history
4. **Gaming Focus**: Designed for Minecraft PvP, esports, competitive gaming
5. **Mobile Support**: Touch-friendly interfaces and mobile-specific tests

### Development Guidelines

#### Component Patterns
- Use TypeScript interfaces for all props
- Implement error boundaries for localStorage operations
- Use Tailwind classes following the cyberpunk theme
- Prefer functional components with hooks
- Extract reusable logic into custom hooks

#### Layout Standardization
- **ALL pages must use unified layout components** - never create custom headers
- Use `SimplePageLayout` for standard content pages (hero + content structure)
- Use `TestPageLayout` for complex test pages with sidebars and multiple sections
- Both layouts include the unified `Header` component with navigation
- Consistent header ensures proper navigation experience across all pages

#### Styling Conventions
- Use custom Tailwind color palette (neon-green, electric, cyber-pink, etc.)
- Follow terminal/code aesthetic (monospace fonts, terminal prefixes)
- Implement responsive design with mobile-first approach
- Use CSS animations for gaming/tech feel

#### Performance Considerations
- CPS tests use precise timing with 100ms intervals
- Event handlers optimized with useCallback
- Large FAQ content managed efficiently
- localStorage operations wrapped in try-catch

#### Type Safety
- Strict TypeScript configuration
- Custom type definitions in src/types/
- Proper typing for localStorage data
- Error handling with proper types

## Common Development Tasks

### Adding New CPS Test Variants
1. Create new page in `src/app/cps/[variant]/page.tsx`
2. **MUST use `SimplePageLayout`** - import from `@/components/layout/SimplePageLayout`
3. Import and configure CpsTest component with appropriate props
4. Add navigation links in NavigationSection component
5. Update FAQ content if needed

**Example structure:**
```tsx
import SimplePageLayout from '@/components/layout/SimplePageLayout'
import CpsTestCore from '@/components/features/cps/CpsTestCore'

export default function NewCpsPage() {
  return (
    <SimplePageLayout
      title="TEST NAME"
      subtitle=">> DESCRIPTION <<"
      description="Detailed description..."
    >
      <section className="mb-20">
        <CpsTestCore duration={5} />
      </section>
    </SimplePageLayout>
  )
}
```

### Adding New Mouse Tests
1. Create component in `src/components/features/`
2. Add route in `src/app/` if needed
3. Update navigation and SEO metadata
4. Follow gaming/cyberpunk design patterns

### Modifying Design System
1. Update colors in `tailwind.config.ts`
2. Reference `GAMER_DESIGN_SYSTEM.md` for design principles
3. Maintain cyberpunk aesthetic consistency
4. Test across all component variants

### SEO Content Updates
1. Modify constants in `src/lib/seo-helpers.ts`
2. Update FAQ arrays in relevant components
3. Ensure structured data compliance
4. Test internal linking structure

This is a specialized gaming/tech tool with a unique aesthetic - maintain the cyberpunk theme and gaming focus when making changes.

## Recent Updates

### Layout Standardization (August 2025)
- **Fixed**: All CPS test pages now use unified layout components
- **Updated pages**: 1-second, 10-second, 100-second, right-click, spacebar, mobile CPS tests
- **Before**: Pages had custom headers or no headers, inconsistent navigation
- **After**: All pages use `SimplePageLayout` with unified `Header` component
- **Impact**: Consistent navigation experience across entire application

### Navigation Issues Resolved
- **butterfly-click page**: Already had correct layout, no 404 issues in code
- **All CPS variants**: Now have consistent header with navigation links
- **SEO improvement**: Better internal linking structure with unified navigation
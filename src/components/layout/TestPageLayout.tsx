'use client'

import React from 'react'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

interface TestPageLayoutProps {
  children: React.ReactNode
  hero?: React.ReactNode
  testArea: React.ReactNode
  sidebar?: React.ReactNode
  faq?: React.ReactNode
  className?: string
}

/**
 * TestPageLayout Component
 * 
 * 統一的測試頁面佈局模板，提供標準的頁面結構。
 * 專為所有測試頁面設計，支持hero區域、測試區域、側邊欄和FAQ。
 * 
 * @component
 * @example
 * ```tsx
 * <TestPageLayout
 *   hero={<HeroSection />}
 *   testArea={<CpsTestCore duration={5} />}
 *   sidebar={
 *     <>
 *       <TestStatsPanel stats={stats} />
 *       <QuickActionsPanel actions={actions} />
 *     </>
 *   }
 *   faq={<PageFaq faqs={faqs} />}
 * />
 * ```
 * 
 * @param hero - Hero section component (optional)
 * @param testArea - Main test component (required)
 * @param sidebar - Sidebar content like stats and quick actions (optional)
 * @param faq - FAQ section (optional)
 * @param children - Additional content (optional)
 * @param className - Additional CSS classes (optional)
 * 
 * @returns {JSX.Element} Structured test page layout
 * 
 * @features
 * - Responsive grid layout optimized for test pages
 * - Flexible sidebar that can accommodate multiple components
 * - Consistent spacing and cyberpunk aesthetic
 * - Mobile-first responsive design
 * - Optional hero and FAQ sections
 * 
 * @design
 * - Uses container mx-auto for consistent width
 * - lg:grid-cols-3 for desktop layout with sidebar
 * - Maintains cyberpunk/gaming theme consistency
 * - Proper spacing between sections
 */
const TestPageLayout: React.FC<TestPageLayoutProps> = ({
  children,
  hero,
  testArea,
  sidebar,
  faq,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <Header />
      
      {/* Hero Section */}
      {hero && hero}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Test Area - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            {testArea}
          </div>

          {/* Sidebar - Takes up 1 column on large screens */}
          {sidebar && (
            <div className="space-y-6">
              {sidebar}
            </div>
          )}
        </div>

        {/* Additional Content */}
        {children && (
          <section className="mt-16">
            {children}
          </section>
        )}

        {/* FAQ Section */}
        {faq && (
          <section className="mt-20">
            {faq}
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default TestPageLayout
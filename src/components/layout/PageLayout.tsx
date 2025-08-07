'use client'

import React from 'react'
import Footer from './footer'
import Header from './Header'

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
}

/**
 * PageLayout Component
 * 
 * 基礎頁面佈局組件，提供標準的頁面結構（header + main + footer）。
 * 用於非測試頁面，如首頁、分類頁面等。
 * 
 * @component
 * @example
 * ```tsx
 * <PageLayout>
 *   <HeroSection />
 *   <main>
 *     <TestGrid tests={allTests} />
 *     <NavigationSection />
 *   </main>
 * </PageLayout>
 * ```
 * 
 * @param children - 頁面內容
 * @param className - 額外CSS類名
 * 
 * @returns {JSX.Element} 基礎頁面結構
 * 
 * @features
 * - 最小化的頁面結構
 * - 自動包含Footer
 * - 支持自定義className
 * - 適用於dashboard和分類頁面
 * 
 * @design
 * - 使用min-h-screen確保全屏高度
 * - 保持cyberpunk/gaming背景
 * - 靈活的內容區域
 */
const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default PageLayout